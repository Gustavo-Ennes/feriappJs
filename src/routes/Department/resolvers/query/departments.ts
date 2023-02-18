import { Department } from "../../department.model";
import { DepartmentInstancesOrEmpty } from "../../types/department";

const departmentsResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<DepartmentInstancesOrEmpty> => {
  const departmentInstances: DepartmentInstancesOrEmpty = await Department.findAll();
  return departmentInstances;
};

export { departmentsResolver };
