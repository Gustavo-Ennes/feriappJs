const vacationsQuery: string = `
query{
  vacations{
    workerId
    id
  }
} 
`;
const vacationsFromQuery: string = `
query{
  vacations(fromWorker: 1){
    workerId
    id
  }
} 
`;

const vacationQuery: string = `
query{
  vacation(id: 1){
    workerId
    id
  }
}
`;
const createVacationMutation = ({
  workerId = "1",
  daysQtd = 15,
  startDate = "2023-02-23T17:35:31.308Z",
  type = "vacation",
}): string => `
mutation{
  createVacation(vacationCreateInput: {
      workerId: "${workerId}"
      daysQtd: ${daysQtd}
      startDate: "${startDate}"
      type: "${type}"
    }
  ){
    id
    workerId
  }
}
`;

const deleteVacationMutation: string = `
mutation{
  deleteVacation(id: 1)
}
`;

const updateVacationMutation = ({
  id,
  daysQtd,
  startDate,
  type,
  deferred,
  observation,
  enjoyed = false,
}: any): string => `
mutation{
  updateVacation(vacationUpdateInput: { 
    id: ${id}
    ${daysQtd ? `daysQtd: ${daysQtd}` : ""}
    ${startDate ? `startDate: "${startDate}"` : ""}
    ${type ? `type: "${type}"` : ""}
    ${deferred ? `deferred: ${deferred}` : ""}
    ${observation ? `observation: "${observation}"` : ""}
    ${enjoyed ? `enjoyed: "${enjoyed}"` : ""}
  })
}
`;

export {
  vacationsQuery,
  vacationQuery,
  createVacationMutation,
  deleteVacationMutation,
  updateVacationMutation,
  vacationsFromQuery,
};
