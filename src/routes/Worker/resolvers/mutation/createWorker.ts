import { verifyToken } from "../../../../firebase/firebase";
import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";
import { Department } from "../../../Department";
import { validateMatriculationNumbers } from "./validation/matriculation";
import { DepartmentInterface } from "../../../Department/types/department";

const createWorkerResolver = async (
  _: any,
  args: { workerInput: WorkerInterface },
  context: { token?: string },
  ___: any
): Promise<WorkerInterface> => {
  await verifyToken(context.token || "");

  const { workerInput } = args;
  const departmentInstance: DepartmentInterface | null =
    await Department.findById(workerInput.department);
  if (!departmentInstance) throw new Error("not found: departmentId not found");

  const { success, error } = await validateMatriculationNumbers(workerInput);
  
  if (!success) throw new Error(`validation error: ${error}`);

  const workerInstance: WorkerInterface = await Worker.create(workerInput);
  return workerInstance;
};

export { createWorkerResolver };
