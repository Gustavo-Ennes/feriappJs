import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";
import { Department } from "../../../Department";
import { validateMatriculationNumbers } from "./validation/matriculation";

const createWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInterface> => {
  const { workerInput } = args;
  workerInput.status = "active";
  const departmentInstance: WorkerInterface | null = await Department.findById(
    workerInput.departmentId
  );
  if (!departmentInstance) throw new Error("not found: departmentId not found");

  const { success, error } = await validateMatriculationNumbers(workerInput);
  if (!success) throw new Error(`validation error: ${error}`);

  const workerInstance: WorkerInterface = await Worker.create(workerInput);
  return workerInstance;
};

export { createWorkerResolver };
