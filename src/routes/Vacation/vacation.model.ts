// import { add } from "date-fns";
import { Schema, Types, model } from "mongoose";

import {
  VacationInterface,
} from "./types/vacation";

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
    workerId: {
      type: Types.ObjectId,
      required: true,
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
    // virtuals:{
    //   endData:{
    //     get(){
// 
    //     }
    //   },
    //   worker:{
    //     get(){
// 
    //     }
    //   },
    // },
    timestamps: true,
  }
);

const Vacation = model<VacationInterface>("Vacation", VacationSchema);

export { Vacation };
