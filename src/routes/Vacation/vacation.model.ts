// import { add } from "date-fns";
import { add } from "date-fns";
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

VacationSchema.virtual("endDate").get(function () {
  return add(new Date(this.startDate), { days: this.daysQtd }).toISOString();
});
VacationSchema.virtual("subType").get(function () {
  return this.type === "dayOff"
    ? this.daysQtd === 1
      ? "integral"
      : "halfDay"
    : undefined;
});

// pre is before model call
VacationSchema.pre(/^find/, function (next) {
  this.populate("worker");
  next();
});

const Vacation = model<VacationInterface>("Vacation", VacationSchema);

export { Vacation };
