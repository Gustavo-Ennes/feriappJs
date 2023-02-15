import { DepartmentModel } from "../../department.model";
import { DepartmentInstancesOrEmpty } from "../../types/department";

const departmentsResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<DepartmentInstancesOrEmpty> => {
  const departmentInstances: DepartmentInstancesOrEmpty = await DepartmentModel.findAll();
  return departmentInstances;
};

export { departmentsResolver };