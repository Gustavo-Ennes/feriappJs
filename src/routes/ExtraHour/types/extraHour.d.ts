import { Document, Types } from "mongoose";
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
  worker?: string | Worker;
  amount?: number;
  nightlyAmount?: number;
  department: string | DepartmentInterface;
  from?: string;
  to?: string;
}

interface ProcessExtraHourReturn {
  created: number;
  updated: number;
  deleted: number;
}

export type { ExtraHourInterface, ExtraHourInput, ProcessExtraHourReturn };
