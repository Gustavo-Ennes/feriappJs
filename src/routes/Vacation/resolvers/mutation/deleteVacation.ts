import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const deleteVacationResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { _id } = args;
  const vacationInstance: VacationInterface | null = await Vacation.findById(
    _id
  );

  if (!vacationInstance) throw new Error("Vacation doesn't exists.");

  await Vacation.deleteOne({ _id });
  return true;
};
export { deleteVacationResolver };
