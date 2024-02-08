import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { clone } from "ramda";

import { vacationMock, workerMock } from "../../../utils/mockApplication";
import { workerExample } from "../../Worker/tests/worker.example";
import { validationPipe } from "../resolvers/mutation/validationPipe";
import { vacationExamplePayload } from "./vacation.example";

describe("Vacation: Validation pipe", () => {
  beforeAll(() => {
    vi.clearAllMocks();
    workerMock.mockResolvedValue(workerExample);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should validate if all validation succeed to create a worker", async () => {
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } = await validationPipe(
      vacationExamplePayload
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't validate if not found a valid worker", async () => {
    workerMock.mockResolvedValueOnce(null);
    const { errorMessage, payload } = await validationPipe(
      vacationExamplePayload
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals("Worker ID not found");
  });

  it("should validate if vacation type equals license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should validate if type equals dayOff", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 1;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't validate if found an invalid type", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "anyone";
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("should allow a 1 day dayOff", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 1;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow a half-day day dayOff", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 0.5;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 15 day dayOff", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 15;
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });
  it("should allow a 30 day vacation", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.daysQtd = 30;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 60 day vacation", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.daysQtd = 60;
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });
  it("should allow a 15 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 15;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow to a 60 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 60;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow a 90 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 90;
    vacationMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 1 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 1;
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow a 12 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 12;
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow a 76 day license", async () => {
    const vacationExampleClone = clone(vacationExamplePayload);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 76;
    const { errorMessage, payload } =
      await validationPipe(vacationExampleClone);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow if there's another vacation in given time period", async () => {
    vacationMock.mockResolvedValueOnce([{}]).mockResolvedValueOnce([]);
    const { errorMessage, payload } = await validationPipe(
      vacationExamplePayload
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "There are another vacation(s) within the given vacation payload period."
    );
  });
});
