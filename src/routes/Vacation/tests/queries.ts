const vacationsQuery: string = `
query{
  vacations{
    worker{
      name
    }
    _id
  }
} 
`;
const vacationsFromQuery: string = `
query{
  vacations(fromWorker: "1"){
    worker{
      name
    }
    _id
  }
} 
`;

const vacationQuery: string = `
query{
  vacation(_id: "1"){
    worker{
      name
    }
    _id
  }
}
`;
const createVacationMutation = ({
  worker = "1",
  daysQtd = 15,
  startDate = "2023-02-23T17:35:31.308Z",
  type = "vacation",
}): string => `
mutation{
  createVacation(vacationInput: {
      worker: "${worker}"
      daysQtd: ${daysQtd}
      startDate: "${startDate}"
      type: "${type}"
    }
  ){
    _id
    worker{
      name
    }
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
  worker,
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
    ${worker ? `worker: "${worker}"` : ""}
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
