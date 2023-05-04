const vacationDefaultObjectId: string = "6414697eb7d80144bcc86170";
const workerDefaultObjectId: string = "6414697eb7d80144bcc86171";
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
  vacations(fromWorker: "${vacationDefaultObjectId}"){
    worker{
      name
    }
    _id
  }
} 
`;

const vacationQuery: string = `
query{
  vacation(_id: "${vacationDefaultObjectId}"){
    worker{
      name
    }
    _id
  }
}
`;
const createVacationMutation = ({
  worker = workerDefaultObjectId,
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
  deleteVacation(_id: "${vacationDefaultObjectId}")
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

const getVacationPdfQuery = (_id: string = vacationDefaultObjectId): string => `
  query{
    vacationPdf(_id: "${_id}", type: "vacation")
  }
`;

export {
  vacationsQuery,
  vacationQuery,
  createVacationMutation,
  deleteVacationMutation,
  updateVacationMutation,
  vacationsFromQuery,
  workerDefaultObjectId,
  vacationDefaultObjectId,
  getVacationPdfQuery,
};
