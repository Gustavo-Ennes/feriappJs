import { verifyToken } from "../../../../firebase/firebase";
import { Vacation } from "../../vacation.model";
import {
  VacationInterface,
  VacationsResolverArgsInterface
} from "../../types/vacation";
import { buildOptions } from "./utils";

const vacationsResolver = async (
  _: unknown,
  args: VacationsResolverArgsInterface,
  context: { token?: string }
): Promise<VacationInterface[]> => {
  await verifyToken(context.token || "");

  const options = buildOptions(args);

  const vacationInstance: VacationInterface[] = await Vacation.find(options)
    .populate("worker")
    .exec();
  return vacationInstance;
};

export { vacationsResolver };
