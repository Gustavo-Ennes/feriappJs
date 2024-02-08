import { parse } from "date-fns";
import { assoc } from "ramda";

const extraHourFixtures = [
  {
    _id: "1",
    amount: 2.5,
    nightlyAmount: 0,
    reference: parse("01-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
  },
  {
    _id: "2",
    amount: 1.5,
    nightlyAmount: 0,
    reference: parse("02-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
  },
  {
    _id: "3",
    amount: 0.5,
    nightlyAmount: 0,
    reference: parse("03-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
  },
  {
    _id: "4",
    amount: 2.5,
    nightlyAmount: 0,
    reference: parse("03-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "2",
      name: "Julio",
    },
  },
];

const extraHourInputFixture = extraHourFixtures.map((extraHourFixture) =>
  assoc("worker", extraHourFixture.worker._id, extraHourFixture)
);

export { extraHourFixtures, extraHourInputFixture };
