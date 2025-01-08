import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";

import { typeDefs, resolvers } from "./src/routes/";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  resolvers,
  typeDefs
});

export { server, app, httpServer };
