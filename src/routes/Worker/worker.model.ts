import { isFuture, isPast } from "date-fns";
import { Schema, Types, model } from "mongoose";

import { Vacation } from "../Vacation";
import { WorkerInterface } from "./types/worker";

const WorkerSchema = new Schema<WorkerInterface>(
  {
    admissionDate: {
      required: true,
      type: Date
    },
    department: {
      ref: "Department",
      required: true,
      type: Types.ObjectId
    },
    justification: {
      default: "Prestação de serviços ao setor de Transporte.",
      type: String
    },
    matriculation: {
      required: true,
      type: String,
      unique: true
    },
    name: {
      required: true,
      type: String
    },
    registry: {
      required: true,
      type: String,
      unique: true
    },
    role: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

WorkerSchema.virtual("status").get(async function () {
  const workerVacations = await Vacation.find({
    deferred: true,
    worker: this._id
  });
  const result = { status: "active" };
  workerVacations.forEach((vacation) => {
    if (
      isPast(new Date(vacation.startDate)) &&
      isFuture(new Date(vacation.endDate))
    ) {
      result.status = vacation.type;
    }
  });
  return result.status;
});

const Worker = model<WorkerInterface>("Worker", WorkerSchema);

export { Worker };
