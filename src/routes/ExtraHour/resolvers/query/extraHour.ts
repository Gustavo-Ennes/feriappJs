import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInterface, ExtraHourInput } from "../../types/extraHour";

const extraHourResolver = async (
  _: any,
  args: { extraHourInput: ExtraHourInput},
  context: { token?: string },
  ___: any
): Promise<ExtraHourInterface | null> => {
  await verifyToken(context.token || "");

  const { extraHourInput } = args;
  const extraHoursTableInstance: ExtraHourInterface | null =
    await ExtraHourModel.findOne(extraHourInput).exec();
  return extraHoursTableInstance;
};

export { extraHourResolver };
