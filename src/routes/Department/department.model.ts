import { Schema, model } from "mongoose";
import { DepartmentInterface } from "./types/department";

const DepartmentSchema = new Schema<DepartmentInterface>(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    responsible: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Department = model<DepartmentInterface>("Department", DepartmentSchema);

export { Department };
