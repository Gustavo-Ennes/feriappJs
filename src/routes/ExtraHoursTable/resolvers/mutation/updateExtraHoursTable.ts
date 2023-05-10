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

  const { extraHoursTableInput } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface | null =
    await ExtraHoursTableModel.findById(extraHoursTableInput._id);

  if (extraHoursTableInstance) {
    extraHoursTableInstance.reference = extraHoursTableInput.reference
    extraHoursTableInstance.days = extraHoursTableInput.days
    await extraHoursTableInstance.save()
    return true;
  }
  return false;
};

export { updateExtraHoursTableResolver };
