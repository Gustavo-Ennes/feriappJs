import { Document } from "mongoose";
import type { Worker } from "../../Worker/types/worker";

interface ExtraHourInterface extends Document {
  reference: Date;
  worker: Worker;
  amount: number;
}

interface ExtraHourInput {
  _id?: ID;
  reference?: Date;
  worker?: string;
  amount?: number;
  from?: string;
  to?: string;
}

interface Hour {
  worker: ID! | Worker;
  number: Float!;
}

interface Day {
  number: number!;
  hours: Hour[];
}

export type { ExtraHourInterface, ExtraHourInput, Day, Hour };
