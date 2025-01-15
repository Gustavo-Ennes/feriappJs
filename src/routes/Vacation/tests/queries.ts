/* eslint-disable @typescript-eslint/no-explicit-any */
const vacationDefaultObjectId: string = "6414697eb7d80144bcc86170";
const workerDefaultObjectId: string = "6414697eb7d80144bcc86171";
const bossDefaultObjectId: string = "6414697eb7d80144bcc86172";
const vacationsQuery: string = `
query($page: Int!){
  vacations(page: $page){
    pageNumber
    totalPages
    items {
      worker{
        name
      }
      boss {
        name
      }
    _id
    }
    error
  }
} 
`;
const vacationsFromQuery: string = `
query{
  vacations(fromWorker: "${vacationDefaultObjectId}"){
    pageNumber
    totalPages
    items {
      worker{
        name
      }
      boss {
        name
      }
    _id
    }  
    error  
  }
} 
`;

const vacationQuery: string = `
query{
  vacation(_id: "${vacationDefaultObjectId}"){
    worker{
      name
    }
    boss {
      name
    }
    _id
  }
}
`;
const createVacationMutation = ({
  boss = bossDefaultObjectId,
  daysQtd = 15,
  startDate = "2023-02-23T17:35:31.308Z",
  type = "vacation",
  worker = workerDefaultObjectId
}): string => `
mutation{
  createVacation(vacationInput: {
      worker: "${worker}"
      boss: "${boss}"
      daysQtd: ${daysQtd}
      startDate: "${startDate}"
      type: "${type}"
    }
  ){
    _id
    worker{
      name
    }
    boss {
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
  boss,
  daysQtd,
  deferred,
  enjoyed = false,
  observation,
  startDate,
  type,
  worker
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
    ${boss ? `boss: "${boss}"` : ""}
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
  bossDefaultObjectId
};
