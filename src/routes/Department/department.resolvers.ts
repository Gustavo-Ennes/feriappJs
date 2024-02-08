import {
  createDepartmentResolver,
  deleteDepartmentResolver,
  departmentResolver,
  departmentsResolver,
  updateDepartmentResolver,
} from "./resolvers";

const departmentResolvers = {
  Mutation: {
    createDepartment: createDepartmentResolver,
    deleteDepartment: deleteDepartmentResolver,
    updateDepartment: updateDepartmentResolver,
  },
  Query: { department: departmentResolver, departments: departmentsResolver },
};

export { departmentResolvers };
