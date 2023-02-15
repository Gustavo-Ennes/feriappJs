import { Model } from "sequelize";

import { DepartmentModel } from "../../department.model";
import {
  DepartmentInstanceInterface,
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
    await DepartmentModel.findByPk(id);
  return departmentInstance;
};

export { departmentResolver };
