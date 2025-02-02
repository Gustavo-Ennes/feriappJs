import { add, isAfter } from "date-fns";
import { Schema, Types, model } from "mongoose";

import { VacationInterface } from "./types/vacation";

const VacationSchema = new Schema<VacationInterface>(
  {
    boss: {
      ref: "Boss",
      required: true,
      type: Types.ObjectId
    },
    daysQtd: {
      required: true,
      type: Number
    },
    deferred: {
      default: true,
      type: Boolean
    },
    endDate: {
      type: Date
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
    }
  },
  {
    timestamps: true
  }
);

VacationSchema.pre("save", function (next) {
  if (this.startDate && this.daysQtd && !this.endDate) {
    this.endDate = new Date(add(this.startDate, { days: this.daysQtd }));
  }
  next();
});

VacationSchema.pre("updateOne", async function (next) {
  const vacation = await this.model.findOne(this.getQuery());
  if (vacation.startDate && vacation.daysQtd && !vacation.endDate) {
    vacation.endDate = new Date(
      add(vacation.startDate, { days: vacation.daysQtd })
    );
    await vacation.save();
  }
  next();
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
