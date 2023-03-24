import { verifyToken } from "../../../../firebase/firebase";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { validationPipe } from "./validationPipe";

const createVacationResolver = async (
  _: any,
  args: { vacationInput: VacationInterface },
  context: { token?: string },
  ___: any
): Promise<VacationInterface> => {
  await verifyToken(context.token || "");

  const { vacationInput } = args;
  const { payload, errorMessage, worker } = await validationPipe(vacationInput);

  if (!errorMessage && worker && payload) {
    const vacationInstance: VacationInterface = await Vacation.create(
      vacationInput
    );
    return vacationInstance;
  } else throw new Error(errorMessage);
};

export { createVacationResolver };
