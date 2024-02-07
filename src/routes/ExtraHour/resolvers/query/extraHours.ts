import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ExtraHourInterface } from "../../types/extraHour";
import { isEmpty } from "ramda";

const extraHoursResolver = async (
  _: any,
  args: { extraHourInput?: ExtraHourInput },
  context: { token?: string },
  ___: any
): Promise<ExtraHourInterface[]> => {
  await verifyToken(context.token || "");

  const { extraHourInput } = args;
  const reference = {
    ...(extraHourInput?.from && { $gte: new Date(extraHourInput?.from) }),
    ...(extraHourInput?.to && { $lte: new Date(extraHourInput?.to) })
  };
  const extraHoursTableInstances: ExtraHourInterface[] =
    await ExtraHourModel.find(isEmpty(reference) ? {} : { reference })
      .populate("worker")
      .exec();

  return extraHoursTableInstances;
};

export { extraHoursResolver };
