
import { Department } from "../../department.model";
import {
  DepartmentInstanceInterface,
} from "../../types/department";

const createDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<DepartmentInstanceInterface> => {
  const { departmentInput } = args;
  const departmentIntance: DepartmentInstanceInterface = await Department.create(
    departmentInput
  );
  return departmentIntance;
};

export { createDepartmentResolver };
