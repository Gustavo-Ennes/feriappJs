import { Schema, model } from "mongoose";

import { BossInterface } from "./types/boss.interface";

const BossSchema = new Schema<BossInterface>(
  {
    name: {
      required: true,
      type: String,
      unique: true
    },
    role: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Boss = model<BossInterface>("Boss", BossSchema);

export { Boss };
