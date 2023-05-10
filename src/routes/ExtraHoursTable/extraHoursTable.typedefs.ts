const extraHoursTableDefinitions = {
  types: `
    type ExtraHoursTable{
      _id: ID!
      reference: String!
      days: [Day!]!
      createdAt: Date
      updatedAt: Date
    }

    input ExtraHoursTableInput{
      _id: ID
      reference: String!
      days: [DayInput!]
    }
    input DayInput{
      number: Int!
      hours: [HourInput!]
    }
    input HourInput{
      workerId: String!
      number: Float!
    }
  
    type Day {
      number: Int!
      hours: [Hour!]!
    }    
    type Hour {
      workerId: ID!
      number: Float!
    }
  `,
  queries: `
    extraHoursTable(_id: ID!): ExtraHoursTable
    extraHoursTables: [ExtraHoursTable]!
  `,
  mutations: `
    createExtraHoursTable(extraHoursTableInput: ExtraHoursTableInput!): ExtraHoursTable
    deleteExtraHoursTable(_id: ID!): Boolean
    updateExtraHoursTable(extraHoursTableInput: ExtraHoursTableInput!): Boolean
  `,
};

export { extraHoursTableDefinitions };
