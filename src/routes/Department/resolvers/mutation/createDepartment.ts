
import { DepartmentModel } from "../../department.model";
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
  const departmentIntance: DepartmentInstanceInterface = await DepartmentModel.create(
    departmentInput
  );
  return departmentIntance;
};

export { createDepartmentResolver };
