import { andThen, pipe } from "ramda";

import type { WorkerInterface } from "../../../types/worker";

import { Worker } from "../../../worker.model";

interface PipePayload {
  workerInput: WorkerInterface;
  validationSuccess?: boolean;
  error?: string;
}
interface PipeResponse {
  success: boolean;
  error?: string;
}

const validateMatriculation = async (
  pipePayload: PipePayload
): Promise<PipePayload> => {
  const workerWithSameMatriculation = await Worker.find({
    _id: {
      $ne: pipePayload.workerInput._id
    },
    matriculation: pipePayload.workerInput.matriculation
  })
    .populate("department")
    .exec();

  return {
    ...pipePayload,
    error:
      workerWithSameMatriculation.length > 0
        ? "Conflict: matriculation exists"
        : undefined,
    validationSuccess: workerWithSameMatriculation.length === 0
  };
};
const validateRegistry = async (
  pipePayload: PipePayload
): Promise<PipePayload> => {
  if (pipePayload.validationSuccess) {
    const workerWithSameRegistry = await Worker.find({
      _id: {
        $ne: pipePayload.workerInput._id
      },
      registry: pipePayload.workerInput.registry
    })
      .populate("department")
      .exec();

    return {
      ...pipePayload,
      error:
        workerWithSameRegistry.length > 0
          ? "Conflict: registry exists"
          : undefined,
      validationSuccess: workerWithSameRegistry.length === 0
    };
  }
  return pipePayload;
};

const validateMatriculationNumbers = async (
  workerInput: WorkerInterface
): Promise<PipeResponse> => {
  const { error, validationSuccess } = await pipe(
    validateMatriculation,
    andThen(validateRegistry)
  )({ workerInput });
  return { error, success: validationSuccess as boolean };
};

export { validateMatriculationNumbers };
