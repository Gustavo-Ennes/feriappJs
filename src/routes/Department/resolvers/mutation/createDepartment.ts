import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const createDepartmentResolver = async (
  _: unknown,
  args:{ departmentInput: DepartmentInterface},
  context: { token?: string }
): Promise<DepartmentInterface> => {
  await verifyToken(context.token || "");

  const { departmentInput } = args;
  const departmentIntance: DepartmentInterface =
    await Department.create(departmentInput);
  return departmentIntance;
};

export { createDepartmentResolver };
