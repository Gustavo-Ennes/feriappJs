import {
  extraHourResolver,
  extraHoursResolver,
  createExtraHourResolver,
  deleteExtraHourResolver,
  updateExtraHourResolver,
} from "./resolvers";

const extraHourResolvers = {
  Query: { extraHour: extraHourResolver, extraHours: extraHoursResolver },
  Mutation: {
    createExtraHour: createExtraHourResolver,
    deleteExtraHour: deleteExtraHourResolver,
    updateExtraHour: updateExtraHourResolver,
  },
};

export { extraHourResolvers };
