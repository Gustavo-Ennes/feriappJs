import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentsResolver = async (
  _: unknown,
  __: unknown,
  context: { token?: string }
): Promise<DepartmentInterface[]> => {
  await verifyToken(context.token || "");

  const departmentInstances: DepartmentInterface[] = await Department.find({});
  return departmentInstances;
};

export { departmentsResolver };
