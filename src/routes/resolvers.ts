//import resolvers or each model inside source

import { departmentResolvers } from "../routes/Department";
import { workerResolvers } from "../routes/Worker";
import { vacationResolvers } from "../routes/Vacation/";
import { searchResolvers } from "../routes/search";
import { extraHoursTableResolvers } from "./ExtraHoursTable";

const { Query: departmentQueries, Mutation: departmentMutations } =
  departmentResolvers;
const { Query: workerQueries, Mutation: workerMutations } = workerResolvers;
const { Query: vacationQueries, Mutation: vacationMutations } =
  vacationResolvers;
const { Query: searchQuery } = searchResolvers;
const { Query: extraHoursTableQueries, Mutation: extraHoursTableMutations } =
  extraHoursTableResolvers;

const resolvers = {
  Query: {
    ...departmentQueries,
    ...workerQueries,
    ...vacationQueries,
    ...searchQuery,
    ...extraHoursTableQueries,
  },
  Mutation: {
    ...departmentMutations,
    ...workerMutations,
    ...vacationMutations,
    ...extraHoursTableMutations,
  },
};

export { resolvers };
