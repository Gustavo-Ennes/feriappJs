import { ApolloServer } from "@apollo/server";

import { typeDefs, resolvers } from "./src/routes/";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export { server };
