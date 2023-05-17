import { parse } from "date-fns";

const extraHourFixtures = [
  {
    _id: "1",
    reference: parse("01-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
    amount: 2.5,
  },
  {
    _id: "2",
    reference: parse("02-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
    amount: 1.5,
  },
  {
    _id: "3",
    reference: parse("03-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "1",
      name: "Afonso",
    },
    amount: 0.5,
  },
  {
    _id: "4",
    reference: parse("03-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    worker: {
      _id: "2",
      name: "Julio",
    },
    amount: 2.5,
  },
];

export { extraHourFixtures };
