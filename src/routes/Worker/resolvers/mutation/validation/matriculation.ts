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
    matriculation: pipePayload.workerInput.matriculation,
    _id: {
      $ne: pipePayload.workerInput._id,
    },
  });

  return {
    ...pipePayload,
    validationSuccess: workerWithSameMatriculation.length === 0,
    error:
      workerWithSameMatriculation.length > 0
        ? "Conflict: matriculation exists"
        : undefined,
  };
};
const validateRegistry = async (
  pipePayload: PipePayload
): Promise<PipePayload> => {
  if (pipePayload.validationSuccess) {
    const workerWithSameRegistry = await Worker.find({
      registry: pipePayload.workerInput.registry,
      _id: {
        $ne: pipePayload.workerInput._id,
      },
    });

    return {
      ...pipePayload,
      validationSuccess: workerWithSameRegistry.length === 0,
      error:
        workerWithSameRegistry.length > 0
          ? "Conflict: registry exists"
          : undefined,
    };
  }
  return pipePayload;
};

const validateMatriculationNumbers = async (
  workerInput: WorkerInterface
): Promise<PipeResponse> => {
  const { validationSuccess, error } = await pipe(
    validateMatriculation,
    andThen(validateRegistry)
  )({ workerInput });
  return { success: validationSuccess as boolean, error };
};

export { validateMatriculationNumbers };
