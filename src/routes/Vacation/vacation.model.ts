import { add, isAfter } from "date-fns";
import { Schema, Types, model } from "mongoose";

import { VacationInterface } from "./types/vacation";

const VacationSchema = new Schema<VacationInterface>(
  {
    boss: {
      ref: "Boss",
      required: true,
      type: Types.ObjectId,
    },
    daysQtd: {
      required: true,
      type: Number
    },
    deferred: {
      default: true,
      type: Boolean
    },
    observation: {
      type: String
    },
    startDate: {
      required: true,
      type: Date
    },
    type: {
      required: true,
      type: String
    },
    worker: {
      ref: "Worker",
      required: true,
      type: Types.ObjectId
    },
  },
  {
    timestamps: true
  }
);

VacationSchema.virtual("endDate").get(function () {
  const newDate: string = add(new Date(this.startDate), {
    days: this.daysQtd < 1 ? 1 : this.daysQtd - 1
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

const Vacation = model<VacationInterface>("Vacation", VacationSchema);

export { Vacation };
