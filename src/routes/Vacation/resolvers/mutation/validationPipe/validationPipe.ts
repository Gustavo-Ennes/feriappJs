import { add } from "date-fns";
import { andThen, pipe } from "ramda";

import { Worker } from "../../../../Worker";
import { WorkerInterface } from "../../../../Worker/types/worker";
import { VacationInterface, PipeContent } from "../../../types/vacation";
import { Vacation } from "../../../vacation.model";
import { checkDaysQtd, checkType } from "./check";

const validateWorker = async (
  pipePayload: PipeContent
): Promise<PipeContent> => {
  const worker: WorkerInterface | null = await Worker.findById(
    pipePayload.payload.worker
  );
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
    const vacations = await Vacation.find({
      deferred: true,
      startDate: {
        $gte: new Date(pipePayload.payload.startDate),
        $lte: add(new Date(pipePayload.payload.startDate), {
          days: pipePayload.payload.daysQtd,
        }),
      },
    });

    // because it'll always return itself
    if (vacations?.length > 1) {
      pipePayload.errorMessage =
        "There are another vacation(s) within the given vacation payload period.";
    }
  }
  return pipePayload;
};

const validationPipe = async (
  vacationPayload: VacationInterface
): Promise<PipeContent> =>
  pipe(
    validateWorker,
    andThen(validateType),
    andThen(validateDaysQtd),
    andThen(validateNoConflict)
  )({ payload: vacationPayload, errorMessage: "" });

export { validationPipe };
