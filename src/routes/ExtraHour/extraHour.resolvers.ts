import {
  extraHourResolver,
  extraHoursResolver,
  processExtraHoursResolver,
} from "./resolvers";

const extraHourResolvers = {
  Query: { extraHour: extraHourResolver, extraHours: extraHoursResolver },
  Mutation: {
    processExtraHours: processExtraHoursResolver,
  },
};

export { extraHourResolvers };
