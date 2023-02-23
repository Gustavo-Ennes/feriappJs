import { add } from "date-fns";
import { andThen, pipe } from "ramda";
import { Op } from "sequelize";

import { Worker } from "../../../../Worker";
import { VacationAttrsInterface, PipeContent } from "../../../types/vacation";
import { checkDaysQtd, checkType } from "./check";

const validateWorker = async (
  pipePayload: PipeContent
): Promise<PipeContent> => {
  const worker = await Worker.findByPk(pipePayload.payload.workerId);
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
    const vacations = await pipePayload.worker?.getVacations({
      where: {
        deferred: true,
        startDate: {
          [Op.gte]: new Date(pipePayload.payload.startDate),
          [Op.lte]: add(new Date(pipePayload.payload.startDate), {
            days: pipePayload.payload.daysQtd,
          }),
        },
      },
    });
    if (vacations?.length) {
      pipePayload.errorMessage =
        "There are another vacation(s) within the given vacation payload period.";
    }
  }
  return pipePayload;
};

const validationPipe = async (
  vacationPayload: VacationAttrsInterface
): Promise<PipeContent> =>
  pipe(
    validateWorker,
    andThen(validateType),
    andThen(validateDaysQtd),
    andThen(validateNoConflict)
  )({ payload: vacationPayload, errorMessage: "", worker: null });

export { validationPipe };
