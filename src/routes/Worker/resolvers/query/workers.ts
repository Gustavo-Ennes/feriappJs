import { verifyToken } from "../../../../firebase/firebase";
import { WorkerInterface } from "../../types/worker";
import { Worker } from "../../worker.model";

const workersResolver = async (
  _: unknown,
  args: { fromDepartment: number | undefined },
  context: { token?: string }
): Promise<WorkerInterface[]> => {
  await verifyToken(context.token || "");

  const { fromDepartment } = args;

  const workerInstances: WorkerInterface[] = await Worker.find(
    fromDepartment ? { department: fromDepartment } : {}
  )
    .populate("department")
    .sort("name")
    .exec();
  return workerInstances;
};

export { workersResolver };
