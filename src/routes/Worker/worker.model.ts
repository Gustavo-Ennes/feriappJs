import { DataTypes } from "sequelize";

import { sequelize } from "../../database/database";
import { Vacation } from "../Vacation/vacation.model";
import { WorkerAttrsInterface, WorkerInstanceInterface } from "./types/worker";

const Worker = sequelize.define<WorkerInstanceInterface, WorkerAttrsInterface>(
  "worker",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matriculation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "worker",
    timestamps: true,
  }
);

Worker.hasMany(Vacation, { as: "vacations" });
Vacation.belongsTo(Worker);

export { Worker };
