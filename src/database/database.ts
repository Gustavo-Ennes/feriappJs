import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_NAME ?? "",
  process.env.POSTGRES_USERNAME ?? "",
  process.env.POSTGRES_PASSWORD ?? "",
  {
    host: process.env.NODE_ENV === "test" ? "localhost" : "postgres",
    dialect: "postgres",
    port: 5432,
  }
);

export { sequelize };
