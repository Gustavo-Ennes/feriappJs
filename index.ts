import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

import { server, app } from "./app";
import "./src/database/database";
import "./src/firebase/firebase";
try {
  (async () => {
    const httpServer = http.createServer(app);
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
    console.log(
      "🗺	 ~ Feriapp node graphql backend running at http://localhost:8080/ ~  🗺"
    );
  })();
} catch (err) {
  console.log("Error at executing the server:\t\t", err);
}
