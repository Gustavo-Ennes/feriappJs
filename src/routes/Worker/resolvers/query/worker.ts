import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { WorkerInterface } from "../../types/worker";
import { Worker } from "../../worker.model";

const workerResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<WorkerInterface | null> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const workerInstance: WorkerInterface | null = await Worker.findById(_id)
      .populate("department")
      .exec();
    return workerInstance;
  } catch (error) {
    const logger = getLogger("workerResolver");
    logger.error({ args }, `Error getting a worker: ${(error as Error).message}`);
    throw error;
  }
};

export { workerResolver };
