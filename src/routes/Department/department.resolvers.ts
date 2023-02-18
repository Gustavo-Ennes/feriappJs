import {
  departmentResolver,
  departmentsResolver,
  createDepartmentResolver,
  deleteDepartmentResolver,
  updateDepartmentResolver,
} from "./resolvers";

const departmentResolvers = {
  Query: { department: departmentResolver, departments: departmentsResolver },
  Mutation: {
    createDepartment: createDepartmentResolver,
    deleteDepartment: deleteDepartmentResolver,
    updateDepartment: updateDepartmentResolver,
  },
};

export { departmentResolvers };
