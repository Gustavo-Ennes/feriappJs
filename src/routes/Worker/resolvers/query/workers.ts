import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";

const workersResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInterface[]> => {
  const { fromDepartment }: { fromDepartment: number | undefined } = args;

  const departmentInstances: WorkerInterface[] = await Worker.find(
    fromDepartment ? { departmentId: fromDepartment } : {}
  );
  return departmentInstances;
};

export { workersResolver };
