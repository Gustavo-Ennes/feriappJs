import { Schema } from "mongoose";

export interface WorkerInterface {
  _id?: string;
  name: string;
  role: string;
  admissionDate: date;
  status?: string;
  registry: string;
  matriculation: string;
  departmentId?: Schema.ObjectId;
}

export type WorkerKeys =
  | "name"
  | "role"
  | "admissionDate"
  | "status"
  | "registry"
  | "matriculation";
