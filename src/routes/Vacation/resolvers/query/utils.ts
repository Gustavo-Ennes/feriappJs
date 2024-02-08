import { mergeAll } from "ramda";

import {
  VacationsQueryOptionsInterface,
  VacationsResolverArgsInterface
} from "../../types/vacation";
import { todayEndDate, todayStartDate } from "../../vacation.utils";

const buildOptions = ({
  deferred,
  fromWorker,
  period,
  type
}: VacationsResolverArgsInterface) => {
  const worker = fromWorker || undefined;
  const options: VacationsQueryOptionsInterface = {};
  const periods = {
    future: { startDate: { $gt: todayEndDate } },
    past: { startDate: { $lt: todayStartDate } },
    present: {
      endDate: { $gte: todayEndDate },
      startDate: { $lte: todayEndDate }
    }
  };

  // because it don't work if a prop is declared but undefined
  if (deferred !== undefined) options.deferred = deferred;
  if (worker) options.worker = worker;
  if (type) options.type = type;
  if (period) return mergeAll([options, periods[period]]);

  return options;
};

export { buildOptions };
