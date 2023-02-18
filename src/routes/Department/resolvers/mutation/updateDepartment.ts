import { Department } from "../../department.model";
import {
  DepartmentInstanceOrNull,
} from "../../types/department.d";

const updateDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { departmentInput } = args;
  const departmentInstance: DepartmentInstanceOrNull =
    await Department.findByPk(departmentInput.id);

  if (departmentInstance) {
    departmentInstance.name = departmentInput.name;
    await departmentInstance.save();
    return true;
  }
  return false;
};

export { updateDepartmentResolver };
