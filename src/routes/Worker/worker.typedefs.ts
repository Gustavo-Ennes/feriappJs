const workerDefinitions = {
  mutations: `
    createWorker(workerInput: WorkerInput): Worker
    deleteWorker(_id: ID!): Boolean
    updateWorker(workerInput: WorkerInput): Boolean
  `,
  queries: `
    worker(_id: ID!): Worker
    workers(fromDepartment: ID): [Worker]
  `,
  types: `
    type Worker{
      _id: ID
      name: String
      role: String
      matriculation: String
      registry: String
      status: String
      admissionDate: Date
      department: Department
      justification: String
      createdAt: Date
      updatedAt: Date
    }

    input WorkerInput{
      _id: ID
      name: String!
      role: String!
      matriculation: String!
      registry: String!
      status: String
      justification: String
      admissionDate: Date!
      department: ID!
    }

    scalar Date
  `
};

export { workerDefinitions };
