import {
  authorizationPdfResolver,
  justificationPdfResolver,
  reportPdfResolver,
  vacationPdfResolver,
  vehicleUsageReportResolver
} from "./resolvers";

const pdfResolvers = {
  Query: {
    authorizationPdf: authorizationPdfResolver,
    justificationPdf: justificationPdfResolver,
    reportPdf: reportPdfResolver,
    vacationPdf: vacationPdfResolver,
    vehicleUsageReportPdf: vehicleUsageReportResolver
  }
};

export { pdfResolvers };
