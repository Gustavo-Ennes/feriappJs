import { add, format, startOfDay } from "date-fns";
import { andThen, pipe } from "ramda";

import { Boss } from "../../../../Boss";
import { Worker } from "../../../../Worker";
import { WorkerInterface } from "../../../../Worker/types/worker";
import { PipeContent, VacationInterface } from "../../../types/vacation";
import { Vacation } from "../../../vacation.model";
import { checkDaysQtd, checkType } from "./check";

const validateWorker = async (
  pipePayload: PipeContent
): Promise<PipeContent> => {
  const worker: WorkerInterface | null = await Worker.findById(
    pipePayload.payload.worker
  )
    .populate("department")
    .exec();
  if (!worker) pipePayload.errorMessage = "Worker ID not found";
  else pipePayload.worker = worker;
  return pipePayload;
};

const validateBoss = async (pipePayload: PipeContent): Promise<PipeContent> => {
  if (pipePayload.errorMessage) return pipePayload;

  const boss = await Boss.findById(pipePayload.payload.boss);
  if (!boss) pipePayload.errorMessage = "Boss not found";
  else pipePayload.boss = boss;

  return pipePayload;
};

const validateType = async (pipePayload: PipeContent): Promise<PipeContent> => {
  if (!pipePayload.errorMessage && pipePayload.payload.type) {
    pipePayload.errorMessage = checkType(pipePayload.payload.type)
      ? ""
      : "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'.";
  }
  return pipePayload;
};

const validateDaysQtd = async (
  pipePayload: PipeContent
): Promise<PipeContent> => {
  if (!pipePayload.errorMessage && pipePayload.payload.daysQtd) {
    pipePayload.errorMessage = checkDaysQtd(pipePayload.payload)
      ? ""
      : "Days quantity don't match vacation type.";
  }
  return pipePayload;
};

const validateNoConflict = async (
  pipePayload: PipeContent
): Promise<PipeContent> => {
  if (!pipePayload.errorMessage && pipePayload.worker) {
    const startDate = startOfDay(
      new Date(pipePayload.payload.startDate).setHours(3)
    );
    const endDate = add(startDate, { days: pipePayload.payload.daysQtd });

    const vacations = await Vacation.find({
      _id: { $ne: pipePayload.payload._id },
      deferred: true,
      worker: pipePayload.worker._id
    })
      .populate("worker")
      .exec();

    const conflictVacations = vacations.filter((vacation) => {
      const loopVacationEndDate = add(vacation.startDate, {
        days: vacation.daysQtd
      });
      return (
        (vacation.startDate >= startDate && vacation.startDate <= endDate) ||
        (vacation.startDate <= startDate && loopVacationEndDate >= startDate)
      );
    });

    if (conflictVacations.length) {
      let errorMessage =
        "This worker have " +
        `${conflictVacations.length == 1 ? "a vacation" : "vacations"} ` +
        "in the same period of the requested vacation: ";

      conflictVacations.forEach((vacation) => {
        errorMessage = errorMessage.concat(
          `\nid: ${vacation._id}\n` +
            `worker: ${(vacation.worker as WorkerInterface)?._id} (${(vacation.worker as WorkerInterface)?.name})\n` +
            `startDate: ${format(vacation.startDate, "dd/MM/yyyy")}\n` +
            `endDate: ${format(vacation.endDate, "dd/MM/yyyy")}`
        );
      });
      pipePayload.errorMessage = errorMessage;
    }
  }
  return pipePayload;
};

const validationPipe = async (
  payload: VacationInterface
): Promise<PipeContent> =>
  pipe(
    validateWorker,
    andThen(validateBoss),
    andThen(validateType),
    andThen(validateDaysQtd),
    andThen(validateNoConflict)
  )({ payload });

export { validationPipe };
