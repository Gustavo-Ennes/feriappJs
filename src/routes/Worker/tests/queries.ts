const workersQuery = `
query{
  workers{
    name
  }
} 
`;

const workerQuery = `
query{
  worker(_id: "1"){
    name
  }
}
`;
const createWorkerMutation = `
mutation{
  createWorker(workerInput:{
    name: "worker 1"
    role: "driver"
    status: "active"
    registry: "0152636"
    matriculation: "15.263-6",
    admissionDate: "${new Date().toISOString()}"
    departmentId: "1"
  }){
    name
    _id
  }
}
`;

const deleteWorkerMutation = `
mutation{
  deleteWorker(_id: "1")
}
`;

const updateWorkerMutation = `
mutation{
  updateWorker(workerInput: {
    name: "worker 666"
    role: "agricultor"
    status: "active"
    registry: "0152636"
    matriculation: "15.263-6",
    admissionDate: "${new Date().toISOString()}"
    departmentId: "1"
    _id: "1"
  })
}
`;

export {
  workersQuery,
  workerQuery,
  createWorkerMutation,
  deleteWorkerMutation,
  updateWorkerMutation,
};
