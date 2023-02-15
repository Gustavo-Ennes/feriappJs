import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_NAME ?? "",
  process.env.POSTGRES_USERNAME ?? "",
  process.env.POSTGRES_PASSWORD ?? "",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  }
);

export { sequelize };
