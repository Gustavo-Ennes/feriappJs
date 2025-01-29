import { add } from "date-fns";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { validationPipe } from "./validationPipe";

const updateVacationResolver = async (
  _: unknown,
  args: { vacationInput: VacationInterface },
  context: { token?: string }
): Promise<boolean | void> => {
  try {
    await verifyToken(context.token || "");

    const { vacationInput } = args;
    const vacationToUpdate = await Vacation.findById(vacationInput._id)
      .populate("worker")
      .populate("boss")
      .exec();

    if (!vacationToUpdate) throw new Error("Vacation doesn't exists.");

    const { errorMessage, payload, worker } =
      await validationPipe(vacationInput);

    vacationInput.startDate = add(new Date(vacationInput.startDate), {
      hours: 3
    });

    if (!errorMessage && worker && payload) {
      await Vacation.updateOne({ _id: vacationInput._id }, vacationInput);
      return true;
    } else throw new Error(errorMessage);
  } catch (error) {
    const logger = getLogger("updateVacationResolver");
    logger.error(
      { args },
      `Erro at updating vacation: ${(error as Error).message}`
    );
    throw error;
  }
};

export { updateVacationResolver };
