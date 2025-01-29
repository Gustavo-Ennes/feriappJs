import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { WorkerInterface } from "../../types/worker";
import { Worker } from "../../worker.model";

const workersResolver = async (
  _: unknown,
  args: { fromDepartment: number | undefined },
  context: { token?: string }
): Promise<WorkerInterface[]> => {
  try {
    await verifyToken(context.token || "");

    const { fromDepartment } = args;

    const workerInstances: WorkerInterface[] = await Worker.find(
      fromDepartment ? { department: fromDepartment } : {}
    )
      .populate("department")
      .sort("name")
      .exec();
    return workerInstances;
  } catch (error) {
    const logger = getLogger("workersResolver");
    logger.error({ args }, `Error getting workers: ${(error as Error).message}`);
    throw error;
  }
};

export { workersResolver };
