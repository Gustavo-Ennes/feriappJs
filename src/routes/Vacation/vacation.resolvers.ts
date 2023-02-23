import {
  vacationResolver,
  vacationsResolver,
  createVacationResolver,
  deleteVacationResolver,
  updateVacationResolver,
} from "./resolvers";

const vacationResolvers = {
  Query: { vacation: vacationResolver, vacations: vacationsResolver },
  Mutation: {
    createVacation: createVacationResolver,
    deleteVacation: deleteVacationResolver,
    updateVacation: updateVacationResolver,
  },
};

export { vacationResolvers };
