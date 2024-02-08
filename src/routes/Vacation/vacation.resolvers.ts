import {
  createVacationResolver,
  deleteVacationResolver,
  updateVacationResolver,
  vacationResolver,
  vacationsResolver
} from "./resolvers";

const vacationResolvers = {
  Mutation: {
    createVacation: createVacationResolver,
    deleteVacation: deleteVacationResolver,
    updateVacation: updateVacationResolver
  },
  Query: { vacation: vacationResolver, vacations: vacationsResolver }
};

export { vacationResolvers };
