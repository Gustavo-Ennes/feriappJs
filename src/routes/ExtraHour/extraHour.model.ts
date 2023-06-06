import { Schema, model, Types } from "mongoose";
import { ExtraHourInterface } from "./types/extraHour";

const ExtraHourSchema = new Schema({
  reference:{
    type: Date,
    required: true
  },
  worker:{
    type: Types.ObjectId,
    required:true,
    ref: 'Worker'
  },
  amount: {
    type:Number,
    required: true
  },
  nightlyAmount: {
    type: Number,
    default: 0
  }
});

// pre is before model call
ExtraHourSchema.pre(/^find/, function (next) {
  this.populate("worker");
  next();
});


const ExtraHourModel = model<ExtraHourInterface>(
  "ExtraHour",
  ExtraHourSchema
);

export { ExtraHourModel };
