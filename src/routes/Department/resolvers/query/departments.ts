import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentsResolver = async (
  _: any,
  __: any,
  ___: any,
  ____: any
): Promise<DepartmentInterface[]> => {
  const departmentInstances: DepartmentInterface[] =
    await Department.find({});
  return departmentInstances;
};

export { departmentsResolver };
