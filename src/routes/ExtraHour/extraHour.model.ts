import { Schema, model, Types, Document } from "mongoose";
import { ExtraHourInterface } from "./types/extraHour";

const ExtraHourSchema = new Schema({
  reference: {
    type: Date,
    required: true
  },
  worker: {
    type: Types.ObjectId,
    required: true,
    ref: "Worker"
  },
  amount: {
    type: Number,
    required: true
  },
  nightlyAmount: {
    type: Number,
    default: 0
  },
  department: {
    type: Types.ObjectId,
    required: true,
    ref: "Department"
  }
});

const ExtraHourModel = model<ExtraHourInterface>("ExtraHour", ExtraHourSchema);

export { ExtraHourModel };
