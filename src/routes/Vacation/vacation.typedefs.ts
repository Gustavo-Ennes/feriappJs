const vacationDefinitions = {
  types: `
    type Vacation{
      id: ID
      daysQtd: Int
      startDate: Date
      endDate: Date
      workerId: ID
      deferred: Boolean
      observation: String
      type: String
      enjoyed: Boolean
    }

    input VacationCreateInput{
      daysQtd: Int!
      startDate: Date!
      workerId: ID!
      observation: String
      type: String!
      enjoyed: Boolean
    }

    input VacationUpdateInput{
      id: ID!
      daysQtd: Int
      startDate: Date
      workerId: ID
      deferred: Boolean
      observation: String
      type: String
      enjoyed: Boolean
    }
  `,
  queries: `
    vacation(id: ID!): Vacation
    vacations(fromWorker: ID): [Vacation]
  `,
  mutations: `
    createVacation(vacationCreateInput: VacationCreateInput): Vacation
    deleteVacation(id: ID!): Boolean
    updateVacation(vacationUpdateInput: VacationUpdateInput): Boolean
  `,
};

export { vacationDefinitions };
