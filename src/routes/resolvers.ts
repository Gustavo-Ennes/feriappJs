//import resolvers or each model inside source

import { departmentResolvers } from "../routes/Department";
import { workerResolvers } from "../routes/Worker";
import { vacationResolvers } from "../routes/Vacation/";
import { searchResolvers } from "../routes/search";
import { extraHourResolvers } from "./ExtraHour";
import { pdfResolvers } from "./Pdf";

const { Query: departmentQueries, Mutation: departmentMutations } =
  departmentResolvers;
const { Query: workerQueries, Mutation: workerMutations } = workerResolvers;
const { Query: vacationQueries, Mutation: vacationMutations } =
  vacationResolvers;
const { Query: searchQuery } = searchResolvers;
const { Query: extraHourQueries, Mutation: extraHourMutations } =
  extraHourResolvers;
const { Query: pdfQueries } = pdfResolvers;

const resolvers = {
  Query: {
    ...departmentQueries,
    ...workerQueries,
    ...vacationQueries,
    ...searchQuery,
    ...extraHourQueries,
    ...pdfQueries,
  },
  Mutation: {
    ...departmentMutations,
    ...workerMutations,
    ...vacationMutations,
    ...extraHourMutations,
  },
};

export { resolvers };
