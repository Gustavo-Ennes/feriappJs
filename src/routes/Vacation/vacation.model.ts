// import { add } from "date-fns";
import { add, isAfter } from "date-fns";
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
  },
  {
    timestamps: true,
  }
);

VacationSchema.virtual("endDate").get(function () {
  const newDate: string = add(new Date(this.startDate), {
    days: this.daysQtd < 1 ? 1 : this.daysQtd - 1,
  }).toISOString();
  return newDate;
});
VacationSchema.virtual("enjoyed").get(function () {
  return isAfter(new Date(), new Date(this.endDate)) && this.deferred;
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
