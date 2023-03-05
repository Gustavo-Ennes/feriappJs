import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department.d";

const updateDepartmentResolver = async (
  _: any,
  args: { departmentInput: DepartmentInterface },
  __: any,
  ___: any
): Promise<Boolean> => {
  const { departmentInput } = args;
  const departmentInstance: DepartmentInterface | null =
    await Department.findById(departmentInput._id);

  if (departmentInstance) {
    await Department.updateOne({ _id: departmentInput._id }, departmentInput);
    return true;
  }
  return false;
};

export { updateDepartmentResolver };
