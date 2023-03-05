import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
dotenv.config();

import "./src/database/database";

import { server } from "./app";

startStandaloneServer(server, {
  listen: { port: 3000 },
});
