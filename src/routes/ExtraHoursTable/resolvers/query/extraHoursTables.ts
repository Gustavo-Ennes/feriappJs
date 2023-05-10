import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface } from "../../types/extraHoursTable";

const extraHoursTablesResolver = async (
  _: any,
  args: { _id: string },
  context: { token?: string },
  ___: any
): Promise<ExtraHoursTableInterface[]> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const extraHoursTableInstances: ExtraHoursTableInterface[] =
    await ExtraHoursTableModel.find();
  return extraHoursTableInstances;
};

export { extraHoursTablesResolver };
