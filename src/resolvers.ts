//import resolvers or each model inside source

import { departmentResolvers } from "./routes/Department/department.resolvers";

const { Query: departmentQueries, Mutation: departmentMutations } =
  departmentResolvers;

const resolvers = {
  Query: {
    ...departmentQueries,
  },
  Mutation: {
    ...departmentMutations,
  },
};

export { resolvers };
