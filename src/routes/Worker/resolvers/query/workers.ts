import { verifyToken } from "../../../../firebase/firebase";
import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const workersResolver = async (
  _: any,
  args: { fromDepartment: number | undefined },
  context: { token?: string },
  ___: any
): Promise<WorkerInterface[]> => {
  await verifyToken(context.token || "");

  const { fromDepartment } = args;

  const workerInstances: WorkerInterface[] = await Worker.find(
    fromDepartment ? { department: fromDepartment } : {}
  ).sort("name");
  return workerInstances;
};

export { workersResolver };
