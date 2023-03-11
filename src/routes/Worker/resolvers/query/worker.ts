import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const workerResolver = async (
  _: any,
  args: { _id: string },
  __: any,
  ___: any
): Promise<WorkerInterface | null> => {
  const { _id } = args;
  const workerInstance: WorkerInterface | null = await Worker.findById(_id);
  return workerInstance;
};

export { workerResolver };
