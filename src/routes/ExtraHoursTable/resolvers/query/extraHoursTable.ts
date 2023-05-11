import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface } from "../../types/extraHoursTable";

const extraHoursTableResolver = async (
  _: any,
  args: { _id?: string; reference?: string },
  context: { token?: string },
  ___: any
): Promise<ExtraHoursTableInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface | null =
    await ExtraHoursTableModel.findOne(args).exec();
  return extraHoursTableInstance;
};

export { extraHoursTableResolver };
