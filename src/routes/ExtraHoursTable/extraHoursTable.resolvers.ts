import {
  extraHoursTableResolver,
  extraHoursTablesResolver,
  createExtraHoursTableResolver,
  deleteExtraHoursTableResolver,
  updateExtraHoursTableResolver,
} from "./resolvers";

const extraHoursTableResolvers = {
  Query: { extraHoursTable: extraHoursTableResolver, extraHoursTables: extraHoursTablesResolver },
  Mutation: {
    createExtraHoursTable: createExtraHoursTableResolver,
    deleteExtraHoursTable: deleteExtraHoursTableResolver,
    updateExtraHoursTable: updateExtraHoursTableResolver,
  },
};

export { extraHoursTableResolvers };
