import { Schema, model } from "mongoose";
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
        workerId: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
      }],
    }
  ],
});

const ExtraHoursTableModel = model<ExtraHoursTableInterface>(
  "Table",
  tableSchema
);

export { ExtraHoursTableModel };
