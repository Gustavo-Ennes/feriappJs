const pdfDefinitions = {
  queries: `
    vacationPdf(vacationId: ID!): String
    justificationPdf(workerId: ID!): String
    authorizationPdf(workerId: ID!, reference: Date!, justification: String!): String
    reportPdf(reference: Date!, departmentId: ID!): String
  `,
};

export { pdfDefinitions };
