import { Document } from "mongoose";
import type { Worker } from "../../Worker/types/worker";

interface ExtraHoursTableInterface extends Document {
  reference: String;
  days: Day[];
}

interface ExtraHoursTableInput {
  _id?: ID;
  reference?: String!;
  days?: Day[];
}

interface Hour {
  worker: ID! | Worker;
  number: Float!;
}

interface Day {
  number: number!;
  hours: Hour[];
}

export type {
  ExtraHoursTableInterface,
  ExtraHoursTableInput,
  ExtraHoursCellInput,
  Day,
  Hour,
};
