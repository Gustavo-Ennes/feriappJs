const workerFixture = {
  _id: "1",
  admissionDate: new Date().toISOString(),
  department: "1",
  matriculation: "matriculation",
  name: "Teste",
  registry: "registry",
  role: "Any",
};
const vacationFixture = {
  _id: "1",
  createdAt: new Date().toISOString(),
  daysQtd: 30,
  endDate: new Date().toISOString(),
  startDate: new Date().toISOString(),
  subType: undefined,
  type: "vacation",
  updatedAt: new Date().toISOString(),
  worker: workerFixture,
};

export { vacationFixture, workerFixture };
