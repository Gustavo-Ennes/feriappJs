import { Schema, Types, model } from "mongoose";

// import { Vacation } from "../Vacation/vacation.model";
import { WorkerInterface } from "./types/worker";

const WorkerSchema = new Schema<WorkerInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    registry: {
      type: String,
      unique: true,
      required: true,
    },
    matriculation: {
      type: String,
      unique: true,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    departmentId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    // virtuals:{
    //   vacations:{
    //     get(){

    //     }
    //   }
    //   department:{
    //     get(){

    //     }
    //   }
    // },
    timestamps: true,
  }
);

const Worker = model<WorkerInterface>("Worker", WorkerSchema);

export { Worker };
