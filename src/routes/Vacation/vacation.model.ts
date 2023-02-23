import { DataTypes } from "sequelize";
import { add } from "date-fns";

import { sequelize } from "../../database/database";
import {
  VacationAttrsInterface,
  VacationInstanceInterface,
} from "./types/vacation";

const Vacation = sequelize.define<
  VacationInstanceInterface,
  VacationAttrsInterface
>(
  "vacation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    daysQtd: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        return add(new Date(this.startDate), { days: this.daysQtd });
      },
      set(value) {
        throw new Error("Do not try to set the `endDate` value!");
      },
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deferred: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    observation: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enjoyed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "vacation",
    timestamps: true,
  }
);

export { Vacation };
