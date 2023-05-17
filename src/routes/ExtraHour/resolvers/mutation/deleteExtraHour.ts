import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInterface } from "../../types/extraHour";

const deleteExtraHourResolver = async (
  _: any,
  args: any,
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const extraHoursTableInstance: ExtraHourInterface | null =
    await ExtraHourModel.findById(_id);
  if (extraHoursTableInstance) {
    await ExtraHourModel.deleteOne({ _id });
    return true;
  }
  return false;
};

export { deleteExtraHourResolver };
