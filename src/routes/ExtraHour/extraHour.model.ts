import { Schema, Types, model } from "mongoose";

import { ExtraHourInterface } from "./types/extraHour";

const ExtraHourSchema = new Schema({
  amount: {
    required: true,
    type: Number
  },
  department: {
    ref: "Department",
    required: true,
    type: Types.ObjectId
  },
  nightlyAmount: {
    default: 0,
    type: Number
  },
  reference: {
    required: true,
    type: Date
  },
  worker: {
    ref: "Worker",
    required: true,
    type: Types.ObjectId
  }
});

const ExtraHourModel = model<ExtraHourInterface>("ExtraHour", ExtraHourSchema);

export { ExtraHourModel };
