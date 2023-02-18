const workerDefinitions = {
  types: `
    type Worker{
      id: ID
      name: String
      role: String
      matriculation: String
      registry: String
      status: String
      admissionDate: Date
      departmentId: ID
    }

    input WorkerCreateInput{
      name: String!
      role: String!
      matriculation: String!
      registry: String!
      status: String!
      admissionDate: Date!
      departmentId: ID!
    }

    input WorkerUpdateInput{
      id: ID!
      name: String
      role: String
      matriculation: String
      registry: String
      status: String
      admissionDate: Date
      departmentId: ID
    }

    scalar Date
  `,
  queries: `
    worker(id: ID!): Worker
    workers(fromDepartment: ID): [Worker]
  `,
  mutations: `
    createWorker(workerInput: WorkerCreateInput): Worker
    deleteWorker(id: ID!): Boolean
    updateWorker(workerInput: WorkerUpdateInput): Boolean
  `,
};

export { workerDefinitions };
