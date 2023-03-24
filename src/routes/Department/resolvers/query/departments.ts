import { verifyToken } from "../../../../firebase/firebase";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentsResolver = async (
  _: any,
  __: any,
  context: { token?: string },
  ____: any
): Promise<DepartmentInterface[]> => {
  await verifyToken(context.token || "");
  
  const departmentInstances: DepartmentInterface[] = await Department.find({});
  return departmentInstances;
};

export { departmentsResolver };
