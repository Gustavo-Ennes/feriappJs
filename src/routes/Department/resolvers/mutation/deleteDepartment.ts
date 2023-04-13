import { verifyToken } from "../../../../firebase/firebase";
import { Worker } from "../../../Worker";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const deleteDepartmentResolver = async (
  _: any,
  args: any,
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
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
