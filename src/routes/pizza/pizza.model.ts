import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";

const PizzaModel = sequelize.define(
  "pizza",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    topping: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "pizza",
    timestamps: true,
  }
);

export { PizzaModel };

// `sequelize.define` also returns the model
