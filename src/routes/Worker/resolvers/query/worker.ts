import { verifyToken } from "../../../../firebase/firebase";
import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const workerResolver = async (
  _: any,
  args: { _id: string },
  context: { token?: string },
  ___: any
): Promise<WorkerInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const workerInstance: WorkerInterface | null = await Worker.findById(_id);
  return workerInstance;
};

export { workerResolver };
