import {
  extraHourResolver,
  extraHoursResolver,
  processExtraHoursResolver,
} from "./resolvers";

const extraHourResolvers = {
  Mutation: {
    processExtraHours: processExtraHoursResolver,
  },
  Query: { extraHour: extraHourResolver, extraHours: extraHoursResolver },
};

export { extraHourResolvers };
