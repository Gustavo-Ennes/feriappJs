const workerDefinitions = {
  types: `
    type Worker{
      _id: ID
      name: String
      role: String
      matriculation: String
      registry: String
      status: String
      admissionDate: Date
      departmentId: ID
    }

    input WorkerInput{
      _id: ID
      name: String!
      role: String!
      matriculation: String!
      registry: String!
      status: String!
      admissionDate: Date!
      departmentId: ID!
    }

    scalar Date
  `,
  queries: `
    worker(_id: ID!): Worker
    workers(fromDepartment: ID): [Worker]
  `,
  mutations: `
    createWorker(workerInput: WorkerInput): Worker
    deleteWorker(_id: ID!): Boolean
    updateWorker(workerInput: WorkerInput): Boolean
  `,
};

export { workerDefinitions };
