import { connect, connection } from "mongoose";

import { getLogger } from "../logger/logger";

async function initializeDatabase() {
  const logger = getLogger("database");
  try {
    await connect(
      (process.env.NODE_ENV === "dev"
        ? process.env.ATLAS_URL_TEST
        : process.env.ATLAS_URL) ?? ""
    );

    logger.info(`NODE_ENV = ${process.env.NODE_ENV}`);
    logger.info("✅ Mongo connected");

    const collections = await connection.db.listCollections().toArray();
    const logsCollection = collections.find((col) => col.name === "logs");

    if (!logsCollection) {
      logger.info("⚡ Creating capped colleciton for logs");
      await connection.db.createCollection("logs", {
        capped: true,
        max: 1000,
        size: 1048576
      });
      logger.info("⚡ Done!");
    } else {
      logger.info("🔹 Log colection already created.");
    }
  } catch (err) {
    logger.error("❌ Error at creating log collection in mongo atlas:", err);
  }
}

initializeDatabase();
