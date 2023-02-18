//import resolvers or each model inside source

import { departmentResolvers } from "../routes/Department";
import { workerResolvers } from "../routes/Worker";

const { Query: departmentQueries, Mutation: departmentMutations } =
  departmentResolvers;
const { Query: workerQueries, Mutation: workerMutations } = workerResolvers;

const resolvers = {
  Query: {
    ...departmentQueries,
    ...workerQueries,
  },
  Mutation: {
    ...departmentMutations,
    ...workerMutations,
  },
};

export { resolvers };
