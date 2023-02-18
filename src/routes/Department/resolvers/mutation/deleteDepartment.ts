import { Model } from "sequelize";

import { Department } from "../../department.model";
import { DepartmentInstanceOrNull } from "../../types/department";

const deleteDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { id } = args;
  const departmentIntance: DepartmentInstanceOrNull =
    await Department.findByPk(id);
  if (departmentIntance) {
    await departmentIntance.destroy();
    return true;
  }
  return false;
};

export { deleteDepartmentResolver };
