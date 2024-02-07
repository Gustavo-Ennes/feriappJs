import {
  vacationPdfResolver,
  justificationPdfResolver,
  authorizationPdfResolver,
  reportPdfResolver,
  vehicleUsageReportResolver
} from "./resolvers";

const pdfResolvers = {
  Query: {
    vacationPdf: vacationPdfResolver,
    justificationPdf: justificationPdfResolver,
    authorizationPdf: authorizationPdfResolver,
    reportPdf: reportPdfResolver,
    vehicleUsageReportPdf: vehicleUsageReportResolver
  }
};

export { pdfResolvers };
