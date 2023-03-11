import { Schema, model } from "mongoose";
import { Vacation } from "../Vacation";
import { VacationInterface } from "../Vacation/types/vacation";
import { DepartmentInterface } from "./types/department";

const DepartmentSchema = new Schema<DepartmentInterface>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department = model<DepartmentInterface>("Department", DepartmentSchema);

export { Department };
