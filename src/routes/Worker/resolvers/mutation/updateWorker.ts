import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker.d";

const updateWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { workerInput }: { workerInput: WorkerInterface } = args;
  const workerInstance: WorkerInterface | null = await Worker.findById(
    workerInput._id
  );

  if (workerInstance) {
    await Worker.updateOne({ _id: workerInput._id }, workerInput);
    return true;
  }
  return false;
};

export { updateWorkerResolver };
