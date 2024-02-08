import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const deleteDepartmentResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<boolean> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const departmentIntance: DepartmentInterface | null =
    await Department.findById(_id);
  if (departmentIntance) {
    await Department.deleteOne({ _id });
    return true;
  }
  return false;
};

export { deleteDepartmentResolver };
