import { departmentResolver } from "./resolvers/query/department";
import { departmentsResolver } from "./resolvers/query/departments";
import { createDepartmentResolver } from "./resolvers/mutation/createDepartment";
import { deleteDepartmentResolver } from "./resolvers/mutation/deleteDepartment";
import { updateDepartmentResolver } from "./resolvers/mutation/updateDepartment";

const departmentResolvers = {
  Query: { department: departmentResolver, departments: departmentsResolver },
  Mutation: {
    createDepartment: createDepartmentResolver,
    deleteDepartment: deleteDepartmentResolver,
    updateDepartment: updateDepartmentResolver,
  },
};

export { departmentResolvers };
