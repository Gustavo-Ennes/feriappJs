import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface } from "../../types/extraHoursTable";

const deleteExtraHoursTableResolver = async (
  _: any,
  args: any,
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface | null =
    await ExtraHoursTableModel.findById(_id);
  if (extraHoursTableInstance) {
    await ExtraHoursTableModel.deleteOne({ _id });
    return true;
  }
  return false;
};

export { deleteExtraHoursTableResolver };
