const extraHoursTableFixture = {
  _id: "1",
  reference: "04-2023",
  days: [
    {
      number: 19,
      hours: [
        { workerId: "2", number: 1.2 },
        { workerId: "22", number: 2.3 },
      ],
    },
    {
      number: 20,
      hours: [{ workerId: "12", number: 0.3 }],
    },
    {
      number: 21,
      hours: [],
    },
  ],
  save: () => undefined
};

export { extraHoursTableFixture };
