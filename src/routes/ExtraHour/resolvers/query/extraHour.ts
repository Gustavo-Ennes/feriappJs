import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ExtraHourInterface } from "../../types/extraHour";

const extraHourResolver = async (
  _: unknown,
  args: { extraHourInput: ExtraHourInput },
  context: { token?: string }
): Promise<ExtraHourInterface | null> => {
  await verifyToken(context.token || "");

  const { extraHourInput } = args;
  const extraHoursTableInstance: ExtraHourInterface | null =
    await ExtraHourModel.findOne(extraHourInput).populate("worker").exec();
  return extraHoursTableInstance;
};

export { extraHourResolver };
