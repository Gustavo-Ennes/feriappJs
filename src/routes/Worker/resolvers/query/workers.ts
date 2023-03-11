import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const workersResolver = async (
  _: any,
  args: { fromDepartment: number | undefined },
  __: any,
  ___: any
): Promise<WorkerInterface[]> => {
  const { fromDepartment } = args;

  const workerInstances: WorkerInterface[] = await Worker.find(
    fromDepartment ? { department: fromDepartment } : {}
  );
  return workerInstances;
};

export { workersResolver };
