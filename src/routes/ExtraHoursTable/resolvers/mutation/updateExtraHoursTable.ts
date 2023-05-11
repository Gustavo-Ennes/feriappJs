import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface, ExtraHoursTableInput } from "../../types/extraHoursTable";

const updateExtraHoursTableResolver = async (
  _: any,
  args: { extraHoursTableInput: ExtraHoursTableInput },
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
  await verifyToken(context.token || "");

  const changes = {occurs: false}
  const { extraHoursTableInput } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface | null =
    await ExtraHoursTableModel.findById(extraHoursTableInput._id);

  if(!extraHoursTableInstance) return false;

  if (extraHoursTableInput.reference) {
    extraHoursTableInstance.reference = extraHoursTableInput.reference
    changes.occurs = true
  }
  if(extraHoursTableInput.days){
    extraHoursTableInstance.days = extraHoursTableInput.days
    changes.occurs = true
  }

  if(changes.occurs){
    await extraHoursTableInstance.save()
    return true;
  }
  return false;
};

export { updateExtraHoursTableResolver };
