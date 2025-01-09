import { bossFixture } from "../../Boss/tests/boss.fixture";
import { workerExample } from "../../Worker/tests/worker.example";
import {
  bossDefaultObjectId,
  vacationDefaultObjectId,
  workerDefaultObjectId
} from "./queries";

const vacationExample = {
  _id: vacationDefaultObjectId,
  boss: bossFixture,
  daysQtd: 15,
  startDate: "2023-02-23T17:35:31.308Z",
  type: "vacation",
  worker: workerExample,
};

const vacationExamplePayload = {
  ...vacationExample,
  boss: bossDefaultObjectId,
  worker: workerDefaultObjectId
};

export { vacationExample, vacationExamplePayload };
