import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../../Department";
import { DepartmentInterface } from "../../../Department/types/department";
import { WorkerInterface } from "../../types/worker";
import { Worker } from "../../worker.model";
import { validateMatriculationNumbers } from "./validation/matriculation";

const createWorkerResolver = async (
  _: unknown,
  args: { workerInput: WorkerInterface },
  context: { token?: string }
): Promise<WorkerInterface> => {
  await verifyToken(context.token || "");

  const { workerInput } = args;
  const departmentInstance: DepartmentInterface | null =
    await Department.findById(workerInput.department);
  if (!departmentInstance) throw new Error("not found: departmentId not found");

  const { error, success } = await validateMatriculationNumbers(workerInput);

  if (!success) throw new Error(`validation error: ${error}`);

  const workerInstance: WorkerInterface = await Worker.create(workerInput);
  return workerInstance;
};

export { createWorkerResolver };
