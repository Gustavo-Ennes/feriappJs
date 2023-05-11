import { Schema, model, Types } from "mongoose";
import { ExtraHoursTableInterface } from "./types/extraHoursTable";

const tableSchema = new Schema({
  reference: {
    type: String,
    required: true,
    match: /^\d{2}-\d{4}$/,
  },
  days: [
    {
      number: {
        type: Number,
        required: true,
      },
      hours: [{
        worker: {
          type: Types.ObjectId,
          required: true,
          ref: "Worker"
        },
        number: {
          type: Number,
          required: true,
        },
      }],
    }
  ],
});

// pre is before model call
tableSchema.pre(/^find/, function (next) {
  this.populate("days.hours.worker");
  next();
});


const ExtraHoursTableModel = model<ExtraHoursTableInterface>(
  "Table",
  tableSchema
);

export { ExtraHoursTableModel };
