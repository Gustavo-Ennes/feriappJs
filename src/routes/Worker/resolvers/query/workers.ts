import { Worker } from "../../worker.model";
import { WorkerInstanceOrEmpty } from "../../types/worker";
import { IntegerDataType } from "sequelize";

const workersResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInstanceOrEmpty> => {
  const { fromDepartment }: { fromDepartment: number | undefined } = args;

  const departmentInstances: WorkerInstanceOrEmpty = await Worker.findAll(
    fromDepartment
      ? {
          where: { departmentId: fromDepartment },
        }
      : {}
  );
  return departmentInstances;
};

export { workersResolver };
