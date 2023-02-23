import { Vacation } from "../../vacation.model";
import { VacationInstanceOrNull } from "../../types/vacation";

const deleteVacationResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { id } = args;
  const vacationInstance: VacationInstanceOrNull = await Vacation.findByPk(id);
  if (vacationInstance) {
    await vacationInstance.destroy();
    return true;
  } else throw new Error("Vacation doesn't exists.");
};

export { deleteVacationResolver };
