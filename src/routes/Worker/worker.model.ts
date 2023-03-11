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
      default: "active",
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
    department: {
      type: Types.ObjectId,
      required: true,
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);
// pre is before model call
WorkerSchema.pre(/^find/, function (next) {
  this.populate("department");
  next();
});

const Worker = model<WorkerInterface>("Worker", WorkerSchema);

export { Worker };
