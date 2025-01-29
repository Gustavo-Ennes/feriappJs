import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const departmentResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<DepartmentInterface | null | void> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const departmentInstance: DepartmentInterface | null =
      await Department.findById(_id);
    return departmentInstance;
  } catch (error) {
    const logger = getLogger("departmentResolver");
    logger.error(
      { args },
      `Erro getting a department: ${(error as Error).message}`
    );
    throw error;
  }
};

export { departmentResolver };
