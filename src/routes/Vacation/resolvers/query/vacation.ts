import { Vacation } from "../../vacation.model";
import { VacationInstanceOrNull } from "../../types/vacation";

const vacationResolver = async (
  _: any,
  args: { id: number },
  __: any,
  ___: any
): Promise<VacationInstanceOrNull> => {
  const { id } = args;
  const vacationInstance: VacationInstanceOrNull = await Vacation.findByPk(id);
  return vacationInstance;
};

export { vacationResolver };
