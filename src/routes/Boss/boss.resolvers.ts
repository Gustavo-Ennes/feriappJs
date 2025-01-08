import {
  bossesResolver,
  bossResolver,
  createBossResolver,
  deleteBossResolver,
  updateBossResolver
} from "./resolvers";

const bossResolvers = {
  Mutation: {
    createBoss: createBossResolver,
    deleteBoss: deleteBossResolver,
    updateBoss: updateBossResolver
  },
  Query: {
    boss: bossResolver,
    bosses: bossesResolver
  }
};

export { bossResolvers };
