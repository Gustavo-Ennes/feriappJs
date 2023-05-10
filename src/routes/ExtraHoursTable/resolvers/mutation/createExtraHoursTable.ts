import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHoursTableModel } from "../../extraHoursTable.model";
import { ExtraHoursTableInterface } from "../../types/extraHoursTable";

const createExtraHoursTableResolver = async (
  _: any,
  args: any,
  context: { token?: string },
  ___: any
): Promise<ExtraHoursTableInterface> => {
  await verifyToken(context.token || "");

  const { extraHoursTableInput } = args;
  const extraHoursTableInstance: ExtraHoursTableInterface =
    await ExtraHoursTableModel.create(extraHoursTableInput);
  return extraHoursTableInstance;
};

export { createExtraHoursTableResolver };
