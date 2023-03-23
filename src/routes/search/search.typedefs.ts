const searchDefinitions = {
  types: `
    type Search{
      vacations: [Vacation!]
      workers: [Worker!]
      departments: [Department!]
    }
  `,
  queries: `
    search(searchTerm: String!): Search
  `,
};

export { searchDefinitions };
