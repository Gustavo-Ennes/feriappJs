import { Types } from "mongoose";
import { workerDefaultObjectId } from "../../Vacation/tests/queries";

const workersQuery = `
query{
  workers{
    name
  }
} 
`;

const workerQuery = `
query{
  worker(_id: "${workerDefaultObjectId}"){
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
    department: "${new Types.ObjectId()}"
  }){
    name
    _id
  }
}
`;

const deleteWorkerMutation = `
mutation{
  deleteWorker(_id: "${workerDefaultObjectId}")
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
    department: "${workerDefaultObjectId}"
    _id: "${workerDefaultObjectId}"
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
