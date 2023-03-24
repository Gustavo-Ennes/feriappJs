import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { server, app } from "./app";
import "./src/database/database";
import "./src/firebase/firebase";

(async () => {
  const httpServer = http.createServer(app);
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, resolve)
  );
  console.log(
    `🗺	 ~ Feriapp node graphql backend running at http://localhost:3000/ ~  🗺`
  );
})();
