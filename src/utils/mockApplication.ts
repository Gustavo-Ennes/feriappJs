/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";

type GetModelMethodParameter = {
  expectedFn: () => any;
  populate?: boolean;
};

const defaultModelMethods = (expectedFn: () => any) => ({
  populate: () => ({
    exec: expectedFn,
    sort: () => ({
      exec: expectedFn
    })
  })
});

// some methods don't use populate('').exec()
const getModelMethods = ({
  expectedFn,
  populate = true
}: GetModelMethodParameter) => ({
  create: expectedFn,
  deleteMany: expectedFn,
  deleteOne: expectedFn,
  find: populate ? () => defaultModelMethods(expectedFn) : expectedFn,
  findById: populate ? () => defaultModelMethods(expectedFn) : expectedFn,
  findOne: populate ? () => defaultModelMethods(expectedFn) : expectedFn,
  insertMany: expectedFn,
  replaceOne: expectedFn,
  updateMany: expectedFn,
  updateOne: expectedFn
});

const vacationMock = vi.fn();
const workerMock = vi.fn();
const departmentMock = vi.fn();
const verifyTokenMock = vi.fn();
const extraHourMock = vi.fn();

vi.doMock("../routes/Vacation/vacation.model", () => ({
  Vacation: getModelMethods({ expectedFn: vacationMock })
}));
vi.doMock("../routes/Worker/worker.model", () => ({
  Worker: getModelMethods({ expectedFn: workerMock })
}));
// department dont call populate().exec()
vi.doMock("../routes/Department/department.model", () => ({
  Department: getModelMethods({ expectedFn: departmentMock, populate: false })
}));
vi.doMock("../routes/ExtraHour/extraHour.model", () => ({
  ExtraHourModel: getModelMethods({ expectedFn: extraHourMock })
}));
vi.doMock("../firebase/firebase", () => ({
  firebaseApp: vi.fn(),
  verifyToken: verifyTokenMock
}));

export {
  vacationMock,
  workerMock,
  departmentMock,
  verifyTokenMock,
  extraHourMock
};
