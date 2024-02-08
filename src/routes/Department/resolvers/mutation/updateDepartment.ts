import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department.d";

const updateDepartmentResolver = async (
  _: unknown,
  args: { departmentInput: DepartmentInterface },
  context: { token?: string }
): Promise<boolean> => {
  await verifyToken(context.token || "");

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
