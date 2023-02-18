const workersQuery = `
query{
  workers{
    name
  }
} 
`;

const workerQuery = `
query{
  worker(id: 1){
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
    departmentId: 1
  }){
    name
    id
  }
}
`;

const deleteWorkerMutation = `
mutation{
  deleteWorker(id: 1)
}
`;

const updateWorkerMutation = `
mutation{
  updateWorker(workerInput: { name: "brand new worker", id: 1})
}
`;

export {
  workersQuery,
  workerQuery,
  createWorkerMutation,
  deleteWorkerMutation,
  updateWorkerMutation,
};
