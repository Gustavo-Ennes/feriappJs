import { vi } from "vitest";

const getModelMethods = (expectedFn: () => any) => ({
  find: expectedFn,
  findById: expectedFn,
  findOne: (condition: any) => ({
    exec: () => expectedFn(),
  }),
  create: expectedFn,
  updateOne: expectedFn,
  deleteOne: expectedFn,
  deleteMany: expectedFn,
  insertMany: expectedFn,
  updateMany: expectedFn,
  replaceOne: expectedFn
});

const vacationMock = vi.fn();
const workerMock = vi.fn();
const departmentMock = vi.fn();
const verifyTokenMock = vi.fn();
const extraHourMock = vi.fn();

vi.doMock("../routes/Vacation/vacation.model", () => ({
  Vacation: getModelMethods(vacationMock),
}));
vi.doMock("../routes/Worker/worker.model", () => ({
  Worker: getModelMethods(workerMock),
}));
vi.doMock("../routes/Department/department.model", () => ({
  Department: getModelMethods(departmentMock),
}));
vi.doMock("../routes/ExtraHour/extraHour.model", () => ({
  ExtraHourModel: getModelMethods(extraHourMock),
}));
vi.doMock("../firebase/firebase", () => ({
  firebaseApp: vi.fn(),
  verifyToken: verifyTokenMock,
}));

export {
  vacationMock,
  workerMock,
  departmentMock,
  verifyTokenMock,
  extraHourMock,
};
