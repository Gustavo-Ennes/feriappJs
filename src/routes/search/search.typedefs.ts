const searchDefinitions = {
  queries: `
    search(searchTerm: String!): Search
  `,
  types: `
    type Search{
      vacations: [Vacation!]
      workers: [Worker!]
      departments: [Department!]
    }
  `,
};

export { searchDefinitions };
