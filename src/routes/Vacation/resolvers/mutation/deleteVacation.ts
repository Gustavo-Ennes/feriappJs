import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const deleteVacationResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<boolean | void> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const vacationInstance: VacationInterface | null = await Vacation.findById(
      _id
    )
      .populate("worker")
      .exec();

    if (!vacationInstance) throw new Error("Vacation doesn't exists.");

    await Vacation.deleteOne({ _id });
    return true;
  } catch (error) {
    const logger = getLogger("deleteVacationResolver");
    logger.error(
      { args },
      `Error at deleting vacation: ${(error as Error).message}`
    );
    throw error;
  }
};
export { deleteVacationResolver };
