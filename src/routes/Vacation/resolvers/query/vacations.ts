import { Vacation } from "../../vacation.model";
import {
  VacationInterface,
  VacationsResolverArgsInterface,
} from "../../types/vacation";
import { buildOptions } from "./utils";

const vacationsResolver = async (
  _: any,
  args: VacationsResolverArgsInterface,
  __: any,
  ___: any
): Promise<VacationInterface[]> => {
  const options = buildOptions(args);

  const vacationInstance: VacationInterface[] = await Vacation.find(options);
  return vacationInstance;
};

export { vacationsResolver };
