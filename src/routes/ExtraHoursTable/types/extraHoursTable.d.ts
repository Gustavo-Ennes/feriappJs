import { Document } from "mongoose";

interface ExtraHoursTableInterface extends Document {
  reference: String;
  days: Day[];
}

interface ExtraHoursTableInput {
  _id: ID;
  reference: String!;
  days: Day[];
}

interface ExtraHoursCellInput {
  tableId: ID!;
  workerId: ID!;
  day: number!;
  hour: number;
}

interface Hour {
  workerId: ID!;
  number: Float!;
}

interface Day {
  number: number!;
  hours: Hour[];
}

interface ExtractDayFunctionParams {
  tableDay: number;
  days: Day[];
}

interface ExtractHoursFunctionParams {
  workerId: string;
  hours: Hour[];
}

export type {
  ExtraHoursTableInterface,
  ExtraHoursTableInput,
  ExtraHoursCellInput,
  Day,
  ExtractHoursFunctionParams,
  Hour,
  ExtractDayFunctionParams,
};
