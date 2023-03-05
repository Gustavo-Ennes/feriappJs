const vacationsQuery: string = `
query{
  vacations{
    workerId
    _id
  }
} 
`;
const vacationsFromQuery: string = `
query{
  vacations(fromWorker: "1"){
    workerId
    _id
  }
} 
`;

const vacationQuery: string = `
query{
  vacation(_id: "1"){
    workerId
    _id
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
  createVacation(vacationInput: {
      workerId: "${workerId}"
      daysQtd: ${daysQtd}
      startDate: "${startDate}"
      type: "${type}"
    }
  ){
    _id
    workerId
  }
}
`;

const deleteVacationMutation: string = `
mutation{
  deleteVacation(_id: "1")
}
`;

const updateVacationMutation = ({
  _id,
  daysQtd,
  startDate,
  type,
  deferred,
  observation,
  enjoyed = false,
  workerId,
}: any): string => `
mutation{
  updateVacation(vacationInput: { 
    _id: "${_id}"
    ${daysQtd ? `daysQtd: ${daysQtd}` : ""}
    ${startDate ? `startDate: "${startDate}"` : ""}
    ${type ? `type: "${type}"` : ""}
    ${deferred ? `deferred: ${deferred}` : ""}
    ${observation ? `observation: "${observation}"` : ""}
    ${enjoyed ? `enjoyed: "${enjoyed}"` : ""}
    ${workerId ? `workerId: "${workerId}"` : ""}
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
