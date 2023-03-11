// import { add } from "date-fns";
import { Schema, Types, model } from "mongoose";

import { VacationInterface } from "./types/vacation";

const VacationSchema = new Schema<VacationInterface>(
  {
    daysQtd: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    worker: {
      type: Types.ObjectId,
      required: true,
      ref: "Worker",
    },
    deferred: {
      type: Boolean,
      default: true,
    },
    observation: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    enjoyed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// pre is before model call
VacationSchema.pre(/^find/, function (next) {
  this.populate("worker");
  next();
});

const Vacation = model<VacationInterface>("Vacation", VacationSchema);

export { Vacation };

// TODO fix tests now