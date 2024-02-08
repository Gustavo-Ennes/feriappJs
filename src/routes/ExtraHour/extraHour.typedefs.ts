const extraHourDefinitions = {
  mutations: `
    processExtraHours(extraHourInput: [ExtraHourInput]!): ProcessExtraHoursReturnType
  `,
  queries: `
    extraHour(extraHourInput: ExtraHourInput!): ExtraHour
    extraHours(extraHourInput: ExtraHourInput): [ExtraHour]!
  `,
  types: `
    type ExtraHour{
      _id: ID!
      reference: Date!
      worker: Worker!
      amount: Float!
      nightlyAmount: Float
      department: Department
      createdAt: Date
      updatedAt: Date
    }

    input ExtraHourInput{
      _id: ID
      reference: Date
      worker: String
      department: String
      amount: Float
      nightlyAmount: Float
      from: String
      to: String
    }

    type ProcessExtraHoursReturnType {
      created: Int
      updated: Int
      deleted: Int
    }
  `,
};

export { extraHourDefinitions };
