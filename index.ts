import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import "pino";
dotenv.config();

import { server, app } from "./app";
import "./src/database/database";
import "./src/firebase/firebase";
import { getLogger } from "./src/logger/logger";

try {
  (async () => {
    const httpServer = http.createServer(app);
    const logger = getLogger("index");
    await server.start();

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token })
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 8080 }, resolve)
    );

    logger.info(
      { query: undefined },
      "🗺	 ~ Feriapp node graphql backend running at http://localhost:8080/ ~  🗺"
    );
  })();
} catch (err) {
  console.log("Error at executing the server:\t\t", err);
}
