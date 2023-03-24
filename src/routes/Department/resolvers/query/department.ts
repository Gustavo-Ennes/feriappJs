import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentResolver = async (
  _: any,
  args: { _id: string },
  context: { token?: string },
  ___: any
): Promise<DepartmentInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const departmentInstance: DepartmentInterface | null =
    await Department.findById(_id);
  return departmentInstance;
};

export { departmentResolver };
