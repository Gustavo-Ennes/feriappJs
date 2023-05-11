const getExtraHoursTableFixture = (type: "id" | "populated") => ({
  _id: "1",
  reference: "04-2023",
  days: [
    {
      number: 19,
      hours:
        type === "populated"
          ? [populatedWorkers[0], populatedWorkers[1]]
          : [idWorkers[0], idWorkers[1]],
    },
    {
      number: 20,
      hours: type === "populated" ? [populatedWorkers[2]] : [idWorkers[2]],
    },
    {
      number: 21,
      hours: [],
    },
  ],
  ...(type === "populated" && { save: () => undefined }),
});

const idWorkers = [
  { worker: "2", number: 1.2 },
  { worker: "22", number: 2.3 },
  { worker: "12", number: 0.3 },
];
const populatedWorkers = [
  { worker: { _id: "1", name: "suckMe" }, number: 1.2 },
  { worker: { _id: "11", name: "fuckYou" }, number: 2.3 },
  { worker: { _id: "12", name: "holyShit" }, number: 0.3 },
];

export { getExtraHoursTableFixture, idWorkers, populatedWorkers };
