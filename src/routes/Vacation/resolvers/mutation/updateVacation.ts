import { verifyToken } from "../../../../firebase/firebase";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { validationPipe } from "./validationPipe";

const updateVacationResolver = async (
  _: any,
  args: { vacationInput: VacationInterface },
  context: { token?: string },
  ___: any
): Promise<boolean> => {
  await verifyToken(context.token || "");

  const { vacationInput } = args;
  const vacationToUpdate = await Vacation.findById(vacationInput._id);

  if (!vacationToUpdate) throw new Error("Vacation doesn't exists.");

  const { payload, errorMessage, worker } = await validationPipe(vacationInput);

  if (!errorMessage && worker && payload) {
    await Vacation.updateOne({ _id: vacationInput._id }, vacationInput);
    return true;
  } else throw new Error(errorMessage);
};

export { updateVacationResolver };
