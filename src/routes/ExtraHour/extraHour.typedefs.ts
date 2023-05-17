const extraHourDefinitions = {
  types: `
    type ExtraHour{
      _id: ID!
      reference: Date!
      worker: Worker!
      amount: Float!
      createdAt: Date
      updatedAt: Date
    }

    input ExtraHourInput{
      _id: ID
      reference: Date
      worker: String
      amount: Float
      from: String
      to: String
    }
  `,
  queries: `
    extraHour(extraHourInput: ExtraHourInput!): ExtraHour
    extraHours(extraHourInput: ExtraHourInput): [ExtraHour]!
  `,
  mutations: `
    createExtraHour(extraHourInput: ExtraHourInput!): ExtraHour
    deleteExtraHour(_id: ID!): Boolean
    updateExtraHour(extraHourInput: ExtraHourInput!): Boolean
  `,
};

export { extraHourDefinitions };
