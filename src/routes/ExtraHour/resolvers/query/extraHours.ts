import { isEmpty } from "ramda";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ExtraHourInterface } from "../../types/extraHour";

const extraHoursResolver = async (
  _: unknown,
  args: { extraHourInput?: ExtraHourInput },
  context: { token?: string }
): Promise<ExtraHourInterface[] | void> => {
  try {
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
  } catch (error) {
    const logger = getLogger("extraHoursResolver");
    logger.error(
      { args },
      `Erro getting extra hours: ${(error as Error).message}`
    );
  }
};

export { extraHoursResolver };
