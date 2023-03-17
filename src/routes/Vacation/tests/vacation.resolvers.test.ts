import { describe, expect, it, afterEach, vi, beforeAll } from "vitest";
import { clone } from "ramda";

import { workerMock, vacationMock } from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  vacationsQuery,
  vacationQuery,
  createVacationMutation,
  deleteVacationMutation,
  updateVacationMutation,
  vacationsFromQuery,
  vacationDefaultObjectId,
} from "./queries";
import { vacationExample } from "./vacation.example";
import { workerExample } from "../../Worker/tests/worker.example";

describe("Vacation: integration", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should list the vacations", async () => {
    vacationMock.mockResolvedValueOnce([vacationExample]);
    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
    });
    expect(body.singleResult?.data).toHaveProperty("vacations");
    expect(body.singleResult?.data.vacations).toEqual([
      { _id: vacationExample._id, worker: { name: "Elias Maluco" } },
    ]);
  });

  it("should list the vacations from a specific worker", async () => {
    vacationMock.mockReturnValueOnce([vacationExample]);
    const { body }: any = await server.executeOperation({
      query: vacationsFromQuery,
    });
    expect(body.singleResult?.data).toHaveProperty("vacations");
    expect(body.singleResult?.data.vacations).toEqual([
      {
        worker: {
          name: "Elias Maluco",
        },
        _id: vacationExample._id,
      },
    ]);
  });

  it("should list a vacation by id", async () => {
    vacationMock.mockReturnValueOnce(vacationExample);
    const { body }: any = await server.executeOperation({
      query: vacationQuery,
    });
    expect(body.singleResult?.data).toHaveProperty("vacation");
    expect(body.singleResult?.data.vacation).toEqual({
      worker: {
        name: "Elias Maluco",
      },
      _id: vacationExample._id,
    });
  });

  it("should create a vacation", async () => {
    const query = createVacationMutation({});
    vacationMock
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(vacationExample);
    workerMock.mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.data.createVacation).toEqual({
      _id: vacationExample._id,
      worker: {
        name: "Elias Maluco",
      },
    });
  });

  it("shouldn't create a vacation if type doesn't exists", async () => {
    const query = createVacationMutation({ type: "foo" });
    workerMock.mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("shouldn't create a vacation if daysQtd dont't match type", async () => {
    const query = createVacationMutation({ type: "dayOff", daysQtd: 60 });
    workerMock.mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't create a vacation if there's another worker's vacation in given period", async () => {
    const query = createVacationMutation({});
    vacationMock
      .mockReturnValueOnce([{ _id: "a9d9a7f8a0da9s0d90a09" }, { _id: "2" }])
      .mockReturnValueOnce([]);
    workerMock.mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "There are another vacation(s) within the given vacation payload period."
    );
  });

  it("should update a vacation", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock
      .mockReturnValueOnce(vacationExample)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(undefined);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 30 });
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.data.updateVacation).toBeTruthy;
  });

  it("shouldn't update a vacation if it doesn't exists", async () => {
    vacationMock.mockReturnValueOnce(null);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 30 });
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Vacation doesn't exists."
    );
  });

  it("shouldn't update a vacation if it's type doesn't exists", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock.mockReturnValueOnce(vacationExample);
    const query = updateVacationMutation({ ...vacationExample, type: "bar" });
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("shouldn't update a vacation if it's daysQtd don't match it's type", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock.mockReturnValueOnce(vacationExample);
    const query = updateVacationMutation({
      ...vacationExample,
      type: "license",
      daysQtd: 1,
    });
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't update a vacation if there's another vacation in the given time period", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock
      .mockReturnValueOnce(vacationExample)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([{}]);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 15 });
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "There are another vacation(s) within the given vacation payload period."
    );
  });

  it("should delete a vacation", async () => {
    vacationMock
      .mockReturnValueOnce(vacationExample)
      .mockResolvedValueOnce(undefined);
    const query = deleteVacationMutation;
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("deleteVacation");
    expect(body.singleResult?.data.deleteVacation).toBeTruthy;
  });

  it("should do nothing if delete and id doesn't exists", async () => {
    vacationMock.mockReturnValueOnce(null);
    const query = deleteVacationMutation;
    const { body }: any = await server.executeOperation({
      query,
    });
    expect(body.singleResult?.data).toHaveProperty("deleteVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Vacation doesn't exists."
    );
  });
});
