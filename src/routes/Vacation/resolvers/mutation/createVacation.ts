import { add } from "date-fns";

import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { validationPipe } from "./validationPipe";

const createVacationResolver = async (
  _: unknown,
  args: { vacationInput: VacationInterface },
  context: { token?: string }
): Promise<VacationInterface | void> => {
  try {
    await verifyToken(context.token || "");

    const { vacationInput } = args;
    const { boss, errorMessage, payload, worker } =
      await validationPipe(vacationInput);

    vacationInput.startDate = add(new Date(vacationInput.startDate), {
      hours: 3
    });

    if (!errorMessage && worker && payload && boss) {
      const vacationInstance: VacationInterface =
        await Vacation.create(vacationInput);
      return vacationInstance;
    } else throw new Error(errorMessage);
  } catch (error) {
    const logger = getLogger("createVacationResolver");
    logger.error(
      { args },
      `Error at creating vacation: ${(error as Error).message}`
    );
    throw error;
  }
};

export { createVacationResolver };
