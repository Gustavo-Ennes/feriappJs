import { Schema } from "mongoose";
import { DepartmentInterface } from "../../Department/types/department";

export interface WorkerInterface {
  _id?: string;
  name: string;
  role: string;
  admissionDate: date;
  status?: string;
  registry: string;
  matriculation: string;
  justification: string;
  department?: DepartmentInterface | Types.ObjectId;
}

export type WorkerKeys =
  | "name"
  | "role"
  | "admissionDate"
  | "status"
  | "registry"
  | "justification"
  | "matriculation";
