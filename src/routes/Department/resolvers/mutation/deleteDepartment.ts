import { Model } from "sequelize";

import { DepartmentModel } from "../../department.model";
import { DepartmentInstanceOrNull } from "../../types/department";

const deleteDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { id } = args;
  const departmentIntance: DepartmentInstanceOrNull =
    await DepartmentModel.findByPk(id);
  if (departmentIntance) {
    await departmentIntance.destroy();
    return true;
  }
  return false;
};

export { deleteDepartmentResolver };
