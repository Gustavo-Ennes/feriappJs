import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentResolver = async (
  _: any,
  args: { _id: string },
  __: any,
  ___: any
): Promise<DepartmentInterface | null> => {
  const { _id } = args;
  const departmentInstance: DepartmentInterface | null =
    await Department.findById(_id);
  return departmentInstance;
};

export { departmentResolver };
