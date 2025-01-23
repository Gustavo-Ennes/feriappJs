const pdfDefinitions = {
  queries: `
    vacationPdf(vacationId: ID!): String
    justificationPdf(workerId: ID!): String
    authorizationPdf(workerId: ID!, reference: Date!): String
    relationPdf(period: String, type: String): String
    reportPdf(reference: Date!, departmentId: ID!): String
    vehicleUsageReportPdf: String
    materialRequisitionPdf: String
  `
};

export { pdfDefinitions };
