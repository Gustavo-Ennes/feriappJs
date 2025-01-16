const bossDefinitions = {
  mutations: `
    createBoss(bossInput: BossInput): Boss
    deleteBoss(_id: ID!): Boolean
    updateBoss(bossInput: BossInput): Boolean
  `,
  queries: `
    boss(_id: ID!): Boss
    bosses(onlyDirectors: Boolean): [Boss]
  `,
  types: `
    type Boss{
      _id: ID
      name: String
      role: String
      createdAt: Date
      updatedAt: Date
      isDirector: Boolean
    }

    input BossInput{
      _id: ID
      name: String!
      role: String!
      isDirector: Boolean
    }
  `
};

export { bossDefinitions };
