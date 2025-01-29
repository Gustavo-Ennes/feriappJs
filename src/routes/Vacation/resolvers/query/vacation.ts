import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const vacationResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<VacationInterface | null | void> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const vacationInstance: VacationInterface | null = await Vacation.findById(
      _id
    )
      .populate("worker")
      .populate("boss")
      .exec();
    return vacationInstance;
  } catch (error) {
    const logger = getLogger("vacationResolver");
    logger.error(
      { args },
      `Erro getting a vacation: ${(error as Error).message}`
    );
    throw error;
  }
};

export { vacationResolver };
