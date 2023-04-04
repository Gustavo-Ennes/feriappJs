import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
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
        context: async ({ req }) => ({ token: req.headers.token }),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 8080 }, resolve)
    );
    console.log(
      `🗺	 ~ Feriapp node graphql backend running at http://localhost:8080/ ~  🗺`
    );
  })();
} catch (err: any) {
  console.log("Error at executing the server:\t\t", err);
}
