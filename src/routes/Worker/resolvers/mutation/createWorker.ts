import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";
import { Department } from "../../../Department";

const createWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInterface> => {
  const { workerInput } = args;
  const departmentInstance: WorkerInterface | null = await Department.findById(
    workerInput.departmentId
  );

  if (departmentInstance) {
    const workerInstance: WorkerInterface = await Worker.create(workerInput);
    return workerInstance;
  } else throw new Error("DepartmentId: inexistent or not given");
};

export { createWorkerResolver };
