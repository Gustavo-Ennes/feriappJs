import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const createDepartmentResolver = async (
  _: unknown,
  args: { departmentInput: DepartmentInterface },
  context: { token?: string }
): Promise<DepartmentInterface | void> => {
  try {
    await verifyToken(context.token || "");

    const { departmentInput } = args;
    const departmentIntance: DepartmentInterface =
      await Department.create(departmentInput);
    return departmentIntance;
  } catch (error) {
    const logger = getLogger("createDepartmentResolver");
    logger.error(
      { args },
      `Erro at creating department: ${(error as Error).message}`
    );
    throw error;
  }
};

export { createDepartmentResolver };
