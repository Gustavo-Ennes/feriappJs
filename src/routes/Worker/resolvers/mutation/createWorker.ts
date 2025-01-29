import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
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
  try {
    await verifyToken(context.token || "");

    const { workerInput } = args;
    const departmentInstance: DepartmentInterface | null =
      await Department.findById(workerInput.department);
    if (!departmentInstance)
      throw new Error("not found: departmentId not found");

    const { error, success } = await validateMatriculationNumbers(workerInput);

    if (!success) throw new Error(`validation error: ${error}`);

    const workerInstance: WorkerInterface = await Worker.create(workerInput);
    return workerInstance;
  } catch (error) {
    const logger = getLogger("createWorkerResolver");
    logger.error(
      { args },
      `Error at creating worker: ${(error as Error).message}`
    );
    throw error;
  }
};

export { createWorkerResolver };
