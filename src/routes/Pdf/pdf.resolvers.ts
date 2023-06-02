import {
  vacationPdfResolver,
  justificationPdfResolver,
  authorizationPdfResolver,
  reportPdfResolver,
} from "./resolvers";

const pdfResolvers = {
  Query: {
    vacationPdf: vacationPdfResolver,
    justificationPdf: justificationPdfResolver,
    authorizationPdf: authorizationPdfResolver,
    reportPdf: reportPdfResolver,
  },
};

export { pdfResolvers };
