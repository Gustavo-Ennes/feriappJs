import { Schema, Types, model } from "mongoose";

// import { Vacation } from "../Vacation/vacation.model";
import { WorkerInterface } from "./types/worker";
import { Vacation } from "../Vacation";
import { isFuture, isPast } from "date-fns";

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

WorkerSchema.virtual("status").get(async function () {
  const workerVacations = await Vacation.find({
    deferred: true,
    worker: this._id,
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
