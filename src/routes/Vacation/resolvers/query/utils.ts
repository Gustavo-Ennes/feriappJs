import { sub } from "date-fns";
import { mergeAll } from "ramda";

import {
  VacationsResolverArgsInterface,
  VacationsQueryOptionsInterface,
} from "../../types/vacation";
import { todayStartDate, todayEndDate } from "../../vacation.utils";

const buildOptions = ({
  fromWorker,
  period,
  type,
  deferred,
  enjoyed,
}: VacationsResolverArgsInterface) => {
  const worker = fromWorker || undefined;
  const options: VacationsQueryOptionsInterface = {};
  const periods = {
    past: { startDate: { $lt: todayStartDate } },
    future: { startDate: { $gt: todayEndDate } },
    present: {
      endDate: { $gte: todayEndDate },
      startDate: { $lte: todayEndDate },
    },
  };

  // because it don't work if a prop is declared but undefined
  if (deferred !== undefined) options.deferred = deferred;
  if (enjoyed !== undefined) options.enjoyed = enjoyed;
  if (worker) options.worker = worker;
  if (type) options.type = type;
  if (period) return mergeAll([options, periods[period]]);

  return options;
};

export { buildOptions };
