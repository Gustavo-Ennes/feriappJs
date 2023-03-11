import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker.d";
import { validateMatriculationNumbers } from "./validation/matriculation";

const updateWorkerResolver = async (
  _: any,
  args: { workerInput: WorkerInterface },
  __: any,
  ___: any
): Promise<Boolean> => {
  const { workerInput }: { workerInput: WorkerInterface } = args;

  const workerInstance: WorkerInterface | null = await Worker.findById(
    workerInput._id
  );
  if (!workerInstance) throw new Error("Worker doesn't exists.");

  const { error, success } = await validateMatriculationNumbers(workerInput);
  if (!success) throw new Error(`validation error: ${error}`);

  await Worker.updateOne({ _id: workerInput._id }, workerInput);
  return true;
};

export { updateWorkerResolver };
