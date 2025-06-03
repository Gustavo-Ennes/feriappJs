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
    const allowedOrigins = [
      "https://feriapp.ennes.dev",
      "https://dev.feriapp.ennes.dev",
      "https://api.feriapp.ennes.dev",
      "http://localhost:5173",
      "http://localhost:8080"
    ];

    const corsOptions: cors.CorsOptions = {
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
      ) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS: ${origin}`));
        }
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "token"]
    };

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(corsOptions),
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
