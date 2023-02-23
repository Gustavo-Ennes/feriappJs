import { Worker } from "../../worker.model";
import { WorkerInstanceInterface } from "../../types/worker";
import { DepartmentInstanceOrNull } from "../../../Department/types/department";
import { Department } from "../../../Department";

const createWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInstanceInterface> => {
  const { workerInput } = args;
  const departmentInstance: DepartmentInstanceOrNull =
    await Department.findByPk(workerInput.departmentId);
  const workerInstance: WorkerInstanceInterface = await Worker.create(
    workerInput
  );

  if (departmentInstance) {
    await workerInstance.setDepartment(departmentInstance);
    await workerInstance.save();
    return workerInstance;
  } else throw new Error("DepartmentId: inexistent or not given");
};

export { createWorkerResolver };
