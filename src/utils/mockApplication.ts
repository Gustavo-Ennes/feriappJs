import { vi } from "vitest";

const getModelMethods = (expectedFn: () => any) => ({
  find: expectedFn,
  findById: expectedFn,
  create: expectedFn,
  updateOne: expectedFn,
  deleteOne: expectedFn,
  deleteMany: expectedFn,
});

const vacationMock = vi.fn();
const workerMock = vi.fn();
const departmentMock = vi.fn();

vi.doMock("../routes/Vacation/vacation.model", () => ({
  Vacation: getModelMethods(vacationMock),
}));
vi.doMock("../routes/Worker/worker.model", () => ({
  Worker: getModelMethods(workerMock),
}));
vi.doMock("../routes/Department/department.model", () => ({
  Department: getModelMethods(departmentMock),
}));

export { vacationMock, workerMock, departmentMock };
