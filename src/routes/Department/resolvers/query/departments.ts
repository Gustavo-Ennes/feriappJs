import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentsResolver = async (
  _: unknown,
  __: unknown,
  context: { token?: string }
): Promise<DepartmentInterface[] | void> => {
  try {
    await verifyToken(context.token || "");

    const departmentInstances: DepartmentInterface[] = await Department.find();
    return departmentInstances;
  } catch (error) {
    const logger = getLogger("departmentsResolver");
    logger.error({}, `Error getting departments: ${(error as Error).message}`);
    throw error;
  }
};

export { departmentsResolver };
