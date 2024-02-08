import {
  createWorkerResolver,
  deleteWorkerResolver,
  updateWorkerResolver,
  workerResolver,
  workersResolver
} from "./resolvers";

const workerResolvers = {
  Mutation: {
    createWorker: createWorkerResolver,
    deleteWorker: deleteWorkerResolver,
    updateWorker: updateWorkerResolver
  },
  Query: { worker: workerResolver, workers: workersResolver }
};

export { workerResolvers };
