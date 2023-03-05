import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const vacationResolver = async (
  _: any,
  args: { _id: string },
  __: any,
  ___: any
): Promise<VacationInterface | null> => {
  const { _id } = args;
  const vacationInstance: VacationInterface | null = await Vacation.findById(
    _id
  );
  return vacationInstance;
};

export { vacationResolver };
