import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";
import {
  DepartmentAttrsInterface,
  DepartmentInstanceInterface,
} from "./types/department";

const DepartmentModel = sequelize.define<
  DepartmentInstanceInterface,
  DepartmentAttrsInterface
>(
  "department",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // after, 1 to many to workers
  },
  {
    tableName: "department",
    timestamps: true,
  }
);

export { DepartmentModel };
