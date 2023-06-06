import { type Model, Types } from "mongoose";

export interface DepartmentInterface {
  name: string;
  responsible: string;
  _id?: string;
}
