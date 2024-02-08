import { add, sub } from "date-fns";
import { andThen, pipe } from "ramda";

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
    const vacationsStartingInRange = await Vacation.find({
      _id: { $ne: pipePayload.payload._id },
      deferred: true,
      startDate: {
        $gt: new Date(pipePayload.payload.startDate),
        $lte: add(new Date(pipePayload.payload.startDate), {
          days: pipePayload.payload.daysQtd,
          seconds: -1
        })
      },
      worker: pipePayload.worker._id
    })
      .populate("worker")
      .exec();
    const vacationsEndingInRange = await Vacation.find({
      _id: { $ne: pipePayload.payload._id },
      deferred: true,
      startDate: {
        $gte: sub(new Date(pipePayload.payload.startDate), {
          days: pipePayload.payload.daysQtd
        }),
        $lt: [new Date(pipePayload.payload.startDate)]
      },
      worker: pipePayload.worker._id
    })
      .populate("worker")
      .exec();
    const vacations = [...vacationsEndingInRange, ...vacationsStartingInRange];
    if (vacations.length) {
      pipePayload.errorMessage =
        "There are another vacation(s) within the given vacation payload period.";
    }
  }
  return pipePayload;
};

const validationPipe = async (
  payload: VacationInterface
): Promise<PipeContent> =>
  pipe(
    validateWorker,
    andThen(validateType),
    andThen(validateDaysQtd),
    andThen(validateNoConflict)
  )({ payload });

export { validationPipe };
