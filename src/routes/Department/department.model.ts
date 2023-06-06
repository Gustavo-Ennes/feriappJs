import { Schema, model } from "mongoose";
import { DepartmentInterface } from "./types/department";

const DepartmentSchema = new Schema<DepartmentInterface>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    responsible: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Department = model<DepartmentInterface>("Department", DepartmentSchema);

export { Department };
