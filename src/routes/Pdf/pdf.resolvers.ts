import {
  authorizationPdfResolver,
  justificationPdfResolver,
  reportPdfResolver,
  vacationPdfResolver,
  vehicleUsageReportResolver,
  materialRequisitionResolver,
  relationPdfResolver
} from "./resolvers";

const pdfResolvers = {
  Query: {
    authorizationPdf: authorizationPdfResolver,
    justificationPdf: justificationPdfResolver,
    materialRequisitionPdf: materialRequisitionResolver,
    relationPdf: relationPdfResolver,
    reportPdf: reportPdfResolver,
    vacationPdf: vacationPdfResolver,
    vehicleUsageReportPdf: vehicleUsageReportResolver,
  }
};

export { pdfResolvers };
