import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ExtraHourInterface } from "../../types/extraHour";

const extraHourResolver = async (
  _: unknown,
  args: { extraHourInput: ExtraHourInput },
  context: { token?: string }
): Promise<ExtraHourInterface | null | void> => {
  try {
    await verifyToken(context.token || "");

    const { extraHourInput } = args;
    const extraHoursTableInstance: ExtraHourInterface | null =
      await ExtraHourModel.findOne(extraHourInput).populate("worker").exec();
    return extraHoursTableInstance;
  } catch (error) {
    const logger = getLogger("extraHourResolver");
    logger.error(
      { args },
      `Erro getting extra hour: ${(error as Error).message}`
    );
    throw error;
  }
};

export { extraHourResolver };
