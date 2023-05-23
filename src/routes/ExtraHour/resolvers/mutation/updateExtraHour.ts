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
  const extraHourInstance: ExtraHourInterface | null =
    await ExtraHourModel.findById(extraHourInput._id);

  if (!extraHourInstance) {
    return false;
  } else if (extraHourInput.amount === 0 ) {
    await ExtraHourModel.deleteOne({_id: extraHourInput._id})
  } else {
    await ExtraHourModel.updateOne({ _id: extraHourInput._id }, extraHourInput);
  }
  return true;
};

export { updateExtraHourResolver };
