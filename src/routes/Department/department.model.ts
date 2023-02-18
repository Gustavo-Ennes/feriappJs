import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";
import { Worker } from "../Worker";
import {
  DepartmentAttrsInterface,
  DepartmentInstanceInterface,
} from "./types/department";

const Department = sequelize.define<
  DepartmentInstanceInterface,
  DepartmentAttrsInterface
>(
  "department",
  {
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
  },
  {
    tableName: "department",
    timestamps: true,
  }
);

Department.hasMany(Worker, { as: "workers" });
Worker.belongsTo(Department)

export { Department };
