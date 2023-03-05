import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const deleteWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { _id } = args;
  const workerInstance: WorkerInterface | null = await Worker.findById(_id);
  if (workerInstance) {
    await Worker.deleteOne({ _id });
    return true;
  }
  return false;
};

export { deleteWorkerResolver };
