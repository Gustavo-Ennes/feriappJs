import { Types } from "mongoose";
import { WorkerInterface } from "../../Worker/types/worker";

export interface VacationInterface {
  daysQtd: number;
  startDate: date;
  endDate?: date;
  worker?: WorkerInterface | string;
  subType?: string;
  deferred?: boolean;
  observation?: string;
  type: string;
  enjoyed?: boolean;
  _id?: string | Types.ObjectId;
  createdAt?: date;
  updatedAt?: date;
}

export interface PipeContent {
  payload: VacationInterface;
  errorMessage?: string;
  worker?: WorkerInterface | null;
}

export interface VacationsResolverArgsInterface {
  fromWorker?: string;
  period?: PeriodOptionsType;
  type?: string;
  deferred?: boolean;
}
export interface VacationsQueryOptionsInterface {
  worker?: string;
  startDate?: {
    $lt?: date;
    $lte?: date;
    $gt?: date;
    $gte?: date;
  };
  type?: string;
  deferred?: boolean;
  enjoyed?: boolean;
}

export type PeriodOptionsType = "past" | "future" | "present";
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
