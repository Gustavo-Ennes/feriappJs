const workerFixture = {
  _id: "1",
  name: "Teste",
  role: "Any",
  admissionDate: new Date().toISOString(),
  registry: "registry",
  matriculation: "matriculation",
  department: "1",
};
const vacationFixture = {
  _id: "1",
  daysQtd: 30,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  subType: undefined,
  type: "vacation",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  worker: workerFixture,
};

export { vacationFixture, workerFixture };
