import { Vacation } from "../../vacation.model";
import { VacationInterface } from "../../types/vacation";

const vacationsResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<VacationInterface[]> => {
  const { fromWorker }: { fromWorker: number | undefined } = args;

  const vacationInstance: VacationInterface[] = await Vacation.find(
    !!fromWorker ? { workerId: fromWorker } : {}
  );
  return vacationInstance;
};

export { vacationsResolver };
