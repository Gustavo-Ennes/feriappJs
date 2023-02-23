import { Vacation } from "../../vacation.model";
import {
  VacationAttrsInterface,
  VacationInstanceInterface,
} from "../../types/vacation";
import { validationPipe } from "./validationPipe";

const createVacationResolver = async (
  _: any,
  args: { vacationCreateInput: VacationAttrsInterface },
  __: any,
  ___: any
): Promise<VacationInstanceInterface> => {
  const { vacationCreateInput } = args;
  const { payload, errorMessage, worker } = await validationPipe(
    vacationCreateInput
  );

  if (!errorMessage && worker && payload) {
    const vacationInstance: VacationInstanceInterface = await Vacation.create(
      vacationCreateInput
    );
    await worker?.addVacation(vacationInstance);
    await worker?.save();
    return vacationInstance;
  } else throw new Error(errorMessage);
};

export { createVacationResolver };
