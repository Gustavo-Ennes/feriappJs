import { Department } from "../../department.model";
import {
  DepartmentInstanceOrNull,
} from "../../types/department";

const departmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<DepartmentInstanceOrNull> => {
  const { id } = args;
  const departmentInstance: DepartmentInstanceOrNull =
    await Department.findByPk(id);
  return departmentInstance;
};

export { departmentResolver };
