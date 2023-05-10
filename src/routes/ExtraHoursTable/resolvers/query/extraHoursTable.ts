import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface } from "../../types/extraHoursTable";

const extraHoursTableResolver = async (
  _: any,
  args: { _id: string },
  context: { token?: string },
  ___: any
): Promise<ExtraHoursTableInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface | null =
    await ExtraHoursTableModel.findById(_id);
  return extraHoursTableInstance;
};

export { extraHoursTableResolver };
