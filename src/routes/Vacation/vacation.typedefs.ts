const vacationDefinitions = {
  types: `
    type Vacation{
      _id: ID
      daysQtd: Int
      startDate: Date
      endDate: Date
      worker: Worker
      deferred: Boolean
      observation: String
      type: String
      enjoyed: Boolean
    }

    input VacationInput{
      _id: ID
      daysQtd: Int!
      startDate: Date!
      worker: ID!
      observation: String
      type: String!
      enjoyed: Boolean
    }
  `,
  queries: `
    vacation(_id: ID!): Vacation
    vacations(fromWorker: ID): [Vacation]
  `,
  mutations: `
    createVacation(vacationInput: VacationInput): Vacation
    deleteVacation(_id: ID!): Boolean
    updateVacation(vacationInput: VacationInput): Boolean
  `,
};

export { vacationDefinitions };
