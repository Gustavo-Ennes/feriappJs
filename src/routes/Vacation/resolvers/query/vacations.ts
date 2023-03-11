import { Vacation } from "../../vacation.model";
import { VacationInterface } from "../../types/vacation";

const vacationsResolver = async (
  _: any,
  args: { fromWorker: number | undefined },
  __: any,
  ___: any
): Promise<VacationInterface[]> => {
  const { fromWorker } = args;

  const vacationInstance: VacationInterface[] = await Vacation.find(
    !!fromWorker ? { worker: fromWorker } : {}
  );
  return vacationInstance;
};

export { vacationsResolver };
