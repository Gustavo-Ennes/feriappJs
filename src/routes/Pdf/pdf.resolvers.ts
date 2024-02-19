import {
  authorizationPdfResolver,
  justificationPdfResolver,
  reportPdfResolver,
  vacationPdfResolver,
  vehicleUsageReportResolver,
  materialRequisitionResolver
} from "./resolvers";

const pdfResolvers = {
  Query: {
    authorizationPdf: authorizationPdfResolver,
    justificationPdf: justificationPdfResolver,
    materialRequisitionPdf: materialRequisitionResolver,
    reportPdf: reportPdfResolver,
    vacationPdf: vacationPdfResolver,
    vehicleUsageReportPdf: vehicleUsageReportResolver
  }
};

export { pdfResolvers };
