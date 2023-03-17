import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { validationPipe } from "./validationPipe";

const createVacationResolver = async (
  _: any,
  args: { vacationInput: VacationInterface },
  __: any,
  ___: any
): Promise<VacationInterface> => {
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
