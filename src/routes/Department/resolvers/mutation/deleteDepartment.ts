import { Worker } from "../../../Worker";
import { Department } from "../../department.model";
import { DepartmentInterface } from "../../types/department";

const deleteDepartmentResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { _id } = args;
  const departmentIntance: DepartmentInterface | null =
    await Department.findById(_id);
  if (departmentIntance) {
    await Department.deleteOne({ _id });
    await Worker.deleteMany({ department: _id });
    return true;
  }
  return false;
};

export { deleteDepartmentResolver };
