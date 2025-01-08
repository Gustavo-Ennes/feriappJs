//import resolvers or each model inside source

import { bossResolvers } from "../routes/Boss";
import { departmentResolvers } from "../routes/Department";
import { vacationResolvers } from "../routes/Vacation/";
import { workerResolvers } from "../routes/Worker";
import { searchResolvers } from "../routes/search";
import { extraHourResolvers } from "./ExtraHour";
import { pdfResolvers } from "./Pdf";

const { Mutation: departmentMutations, Query: departmentQueries } =
  departmentResolvers;
const { Mutation: workerMutations, Query: workerQueries } = workerResolvers;
const { Mutation: vacationMutations, Query: vacationQueries } =
  vacationResolvers;
const { Query: searchQuery } = searchResolvers;
const { Mutation: extraHourMutations, Query: extraHourQueries } =
  extraHourResolvers;
const { Query: pdfQueries } = pdfResolvers;
const { Mutation: bossMutations, Query: bossQueries } = bossResolvers;

const resolvers = {
  Mutation: {
    ...departmentMutations,
    ...workerMutations,
    ...vacationMutations,
    ...extraHourMutations,
    ...bossMutations
  },
  Query: {
    ...departmentQueries,
    ...workerQueries,
    ...vacationQueries,
    ...searchQuery,
    ...extraHourQueries,
    ...pdfQueries,
    ...bossQueries
  }
};

export { resolvers };
