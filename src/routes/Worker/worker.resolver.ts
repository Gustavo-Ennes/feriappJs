import {
  workerResolver,
  workersResolver,
  createWorkerResolver,
  deleteWorkerResolver,
  updateWorkerResolver,
} from "./resolvers";

const workerResolvers = {
  Query: { worker: workerResolver, workers: workersResolver },
  Mutation: {
    createWorker: createWorkerResolver,
    deleteWorker: deleteWorkerResolver,
    updateWorker: updateWorkerResolver,
  },
};

export { workerResolvers };
