const vacationDefinitions = {
  mutations: `
    createVacation(vacationInput: VacationInput): Vacation
    deleteVacation(_id: ID!): Boolean
    updateVacation(vacationInput: VacationInput): Boolean
  `,
  queries: `
    vacation(_id: ID!): Vacation
    vacations(
      fromWorker: ID, 
      period: String, 
      type: String, 
      deferred: Boolean,
      page: Int
    ): VacationPagination
  `,
  types: `
    type Vacation{
      _id: ID
      daysQtd: Float
      startDate: Date
      endDate: Date
      subType: String
      worker: Worker
      deferred: Boolean
      observation: String
      type: String
      enjoyed: Boolean
      createdAt: Date
      updatedAt: Date
      boss: Boss
    }

    type VacationPagination {
      items: [Vacation]
      pageNumber: Int
      totalPages: Int
      totalResults: Int
      error: String
    }

    input VacationInput{
      _id: ID
      daysQtd: Float!
      startDate: Date!
      worker: ID!
      boss: ID!
      observation: String
      type: String!
      enjoyed: Boolean
      deferred: Boolean
    }

  `
};

export { vacationDefinitions };
