import { Vacation } from "../../vacation.model";
import { VacationAttrsInterface, VacationKeys } from "../../types/vacation";
import { validationPipe } from "./validationPipe";

const updateVacationResolver = async (
  _: any,
  args: { vacationUpdateInput: VacationAttrsInterface },
  __: any,
  ___: any
): Promise<boolean> => {
  const { vacationUpdateInput } = args;
  const vacationToUpdate = await Vacation.findByPk(vacationUpdateInput.id);

  if (!vacationToUpdate) throw new Error("Vacation doesn't exists.");

  const { payload, errorMessage, worker } = await validationPipe({
    ...vacationToUpdate,
    ...vacationUpdateInput,
  });

  if (!errorMessage && worker && payload) {
    const inputKeys: VacationKeys[] = Object.keys(
      vacationUpdateInput
    ) as VacationKeys[];
    inputKeys.forEach((key: VacationKeys): void => {
      vacationToUpdate[key] = vacationUpdateInput[key];
    });
    await vacationToUpdate?.save();
    return true;
  } else throw new Error(errorMessage);
};

export { updateVacationResolver };
