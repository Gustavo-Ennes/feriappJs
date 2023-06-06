const vacationPdfQuery: string = `
  query VacationPdf($vacationId: ID!){
    vacationPdf(vacationId: $vacationId)
  }
`;
const justificationPdfQuery = `
query JustificationPdf($workerId: ID!){
  justificationPdf(workerId: $workerId)
}
`;

const authorizationPdfQuery = `
query AuthorizationPdf($workerId: ID!, $reference: Date!){
  authorizationPdf(workerId: $workerId, reference: $reference)
}
`;

const reportPdfPdfQuery = `
query ReportPdf($departmentId: ID!, $reference: Date!){
  reportPdf(reference: $reference, departmentId: $departmentId)
}
`;

export {
  vacationPdfQuery,
  justificationPdfQuery,
  authorizationPdfQuery,
  reportPdfPdfQuery,
};
