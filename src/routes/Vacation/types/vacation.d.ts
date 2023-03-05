import { Schema, type Model } from "mongoose";
import { WorkerInterface } from "../../Worker/types/worker";

export interface VacationInterface {
  daysQtd: number;
  startDate: date;
  endDate?: date;
  workerId: Schema.ObjectId;
  deferred?: boolean;
  observation?: string;
  type: string;
  enjoyed?: boolean;
  _id?: string;
}

export interface PipeContent {
  payload: VacationInterface;
  errorMessage: string;
  worker: WorkerInterface | null;
}

export type VacationDaysQtdPossibilities = 15 | 30;
export type PremiumLicenseQtdPossibilities =
  | VacationDaysQtdPossibilities
  | 45
  | 60
  | 75
  | 90;
export type VacationTypes = "vacation" | "premiumLicense" | "dayOff";
export type VacationKeys =
  | "daysQtd"
  | "startDate"
  | "deferred"
  | "observation"
  | "type"
  | "enjoyed";
