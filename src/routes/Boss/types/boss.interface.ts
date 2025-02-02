import { Types } from "mongoose";

export interface BossInterface {
  name: string;
  role: string;
  _id?: string | Types.ObjectId;
  isDirector?: boolean;
  isActive?: boolean;
}

export type BossesResolverArgs = {
  onlyDirectors?: boolean;
};
