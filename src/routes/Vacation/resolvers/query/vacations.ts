import { Vacation } from "../../vacation.model";
import { VacationInstanceOrEmpty } from "../../types/vacation";

const vacationsResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<VacationInstanceOrEmpty> => {
  const { fromWorker }: { fromWorker: number | undefined } = args;

  const vacationInstance: VacationInstanceOrEmpty = await Vacation.findAll(
    fromWorker
      ? {
          where: { workerId: fromWorker },
        }
      : undefined
  );
  return vacationInstance;
};

export { vacationsResolver };
