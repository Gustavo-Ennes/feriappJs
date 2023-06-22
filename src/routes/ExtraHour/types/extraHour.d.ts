import { Document } from "mongoose";
import type { Worker } from "../../Worker/types/worker";
import type { DepartmentInterface } from "../../Department/types/department";

interface ExtraHourInterface extends Document {
  reference: Date;
  worker: Worker;
  amount: number;
  nightlyAmount: number;
  department?: DepartmentInterface;
}

interface ExtraHourInput {
  _id?: ID;
  reference?: Date;
  worker?: string;
  amount?: number;
  nightlyAmount?: number;
  department: string;
  from?: string;
  to?: string;
}

export type { ExtraHourInterface, ExtraHourInput };
