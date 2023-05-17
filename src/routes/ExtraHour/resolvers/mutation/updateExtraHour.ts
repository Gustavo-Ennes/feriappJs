import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInterface, ExtraHourInput } from "../../types/extraHour";

const updateExtraHourResolver = async (
  _: any,
  args: { extraHourInput: ExtraHourInput },
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
  await verifyToken(context.token || "");

  const { extraHourInput } = args;
  const extraHoursTableInstance: ExtraHourInterface | null =
    await ExtraHourModel.findById(extraHourInput._id);

  if(!extraHoursTableInstance) return false;

  await ExtraHourModel.updateOne({_id: extraHourInput}, extraHourInput)
  return true;
};

export { updateExtraHourResolver };
