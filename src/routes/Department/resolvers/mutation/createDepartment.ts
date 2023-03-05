import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const createDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<DepartmentInterface> => {
  const { departmentInput } = args;
  const departmentIntance: DepartmentInterface =
    await Department.create(departmentInput);
  return departmentIntance;
};

export { createDepartmentResolver };
