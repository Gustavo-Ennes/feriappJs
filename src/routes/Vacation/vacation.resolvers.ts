import {
  vacationResolver,
  vacationPdfResolver,
  vacationsResolver,
  createVacationResolver,
  deleteVacationResolver,
  updateVacationResolver,
} from "./resolvers";

const vacationResolvers = {
  Query: { vacation: vacationResolver, vacations: vacationsResolver, vacationPdf: vacationPdfResolver },
  Mutation: {
    createVacation: createVacationResolver,
    deleteVacation: deleteVacationResolver,
    updateVacation: updateVacationResolver,
  },
};

export { vacationResolvers };
