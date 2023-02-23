//import resolvers or each model inside source

import { departmentResolvers } from "../routes/Department";
import { workerResolvers } from "../routes/Worker";
import { vacationResolvers } from "../routes/Vacation/";

const { Query: departmentQueries, Mutation: departmentMutations } =
  departmentResolvers;
const { Query: workerQueries, Mutation: workerMutations } = workerResolvers;
const { Query: vacationQueries, Mutation: vacationMutations } =
  vacationResolvers;

const resolvers = {
  Query: {
    ...departmentQueries,
    ...workerQueries,
    ...vacationQueries,
  },
  Mutation: {
    ...departmentMutations,
    ...workerMutations,
    ...vacationMutations,
  },
};

export { resolvers };
