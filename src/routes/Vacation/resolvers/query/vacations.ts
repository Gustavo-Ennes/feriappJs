import { verifyToken } from "../../../../firebase/firebase";
import { Vacation } from "../../vacation.model";
import {
  VacationInterface,
  VacationsResolverArgsInterface,
} from "../../types/vacation";
import { buildOptions } from "./utils";

const vacationsResolver = async (
  _: any,
  args: VacationsResolverArgsInterface,
  context: { token?: string },
  ___: any
): Promise<VacationInterface[]> => {
  await verifyToken(context.token || "");

  const options = buildOptions(args);

  const vacationInstance: VacationInterface[] = await Vacation.find(options);
  return vacationInstance;
};

export { vacationsResolver };
