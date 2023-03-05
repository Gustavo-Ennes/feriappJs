import { Schema, model } from "mongoose";
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
    //   virtuals:{
    //     vacations:{
    //       get(){
    //
    //       }
    //     },
    //     workers:{
    //       get(){
    //
    //       }
    //     }
    //   },
    timestamps: true,
  }
);

const Department = model<DepartmentInterface>(
  "Department",
  DepartmentSchema
);

export { Department };
