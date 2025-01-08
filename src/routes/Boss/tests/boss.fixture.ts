import { Types } from "mongoose";

const bossFixture = {
  _id: new Types.ObjectId().toString(),
  name: "Airton Senna",
  role: "Transport Director"
};

export { bossFixture };
