import { Document } from "mongoose";
import type { Worker } from "../../Worker/types/worker";

interface ExtraHourInterface extends Document {
  reference: Date;
  worker: Worker;
  amount: number;
  nightlyAmount: number;
}

interface ExtraHourInput {
  _id?: ID;
  reference?: Date;
  worker?: string;
  amount?: number;
  nightlyAmount?: number;
  from?: string;
  to?: string;
}

export type { ExtraHourInterface, ExtraHourInput };
