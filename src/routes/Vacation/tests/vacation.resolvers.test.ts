/* eslint-disable @typescript-eslint/no-explicit-any */
import { add } from "date-fns";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import {
  bossMock,
  vacationMock,
  workerMock
} from "../../../utils/mockApplication";
import { bossFixture } from "../../Boss/tests/boss.fixture";
import { workerExample } from "../../Worker/tests/worker.example";
import {
  createVacationMutation,
  deleteVacationMutation,
  updateVacationMutation,
  vacationQuery,
  vacationsFromQuery,
  vacationsQuery
} from "./queries";
import { vacationExample } from "./vacation.example";

describe("Vacation: integration", async () => {
  const { server } = await import("../../../../app");

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
      variables: { page: 1 }
    });
    expect(body.singleResult?.data).toHaveProperty("vacations");
    expect(body.singleResult?.data.vacations).toEqual({
      error: null,
      items: [
        {
          _id: vacationExample._id,
          boss: { name: bossFixture.name },
          worker: { name: vacationExample.worker.name }
        }
      ],
      pageNumber: 1,
      totalPages: 1,
      totalResults: 1
    });
  });

  it("should list the vacations from a specific worker", async () => {
    vacationMock.mockReturnValueOnce([vacationExample]);
    const { body }: any = await server.executeOperation({
      query: vacationsFromQuery
    });
    expect(body.singleResult?.data).toHaveProperty("vacations");
    expect(body.singleResult?.data.vacations).toEqual({
      error: null,
      items: [
        {
          _id: vacationExample._id,
          boss: { name: bossFixture.name },
          worker: { name: vacationExample.worker.name }
        }
      ],
      pageNumber: 1,
      totalPages: 1,
      totalResults: 1
    });
  });

  it("should list a vacation by id", async () => {
    vacationMock.mockReturnValueOnce(vacationExample);
    const { body }: any = await server.executeOperation({
      query: vacationQuery
    });
    expect(body.singleResult?.data).toHaveProperty("vacation");
    expect(body.singleResult?.data.vacation).toEqual({
      _id: vacationExample._id,
      boss: { name: bossFixture.name },
      worker: { name: vacationExample.worker.name }
    });
  });

  it("should create a vacation", async () => {
    const query = createVacationMutation({});
    vacationMock.mockReturnValueOnce([]).mockReturnValueOnce(vacationExample);
    workerMock.mockReturnValueOnce(workerExample);
    bossMock.mockReturnValueOnce(bossFixture);
    const { body }: any = await server.executeOperation({
      query
    });

    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.data.createVacation).toEqual({
      _id: vacationExample._id,
      boss: { name: bossFixture.name },
      worker: { name: vacationExample.worker.name }
    });
  });

  it("shouldn't create a vacation if type doesn't exists", async () => {
    const query = createVacationMutation({ type: "foo" });
    workerMock.mockReturnValueOnce(workerExample);
    bossMock.mockResolvedValueOnce(bossFixture);
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("shouldn't create a vacation if daysQtd dont't match type", async () => {
    const query = createVacationMutation({ daysQtd: 60, type: "dayOff" });
    workerMock.mockReturnValueOnce(workerExample);
    bossMock.mockResolvedValueOnce(bossFixture);
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't create a vacation if there's another worker's vacation in given period", async () => {
    const query = createVacationMutation({});
    const startDate = new Date("2023-02-23T17:35:31.308Z");
    vacationMock.mockReturnValueOnce([
      {
        _id: "a9d9a7f8a0da9s0d90a09",
        endDate: add(startDate, { days: 15 }),
        startDate,
        worker: workerExample
      }
    ]);
    workerMock.mockReturnValueOnce(workerExample);
    bossMock.mockResolvedValueOnce(bossFixture);
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("createVacation");
    expect(body.singleResult?.errors?.[0].message)
      .toEqual(`This worker have a vacation in the same period of the requested vacation: 
id: a9d9a7f8a0da9s0d90a09
worker: 6414697eb7d80144bcc86171 (Joseph Climber)
startDate: 23/02/2023
endDate: 10/03/2023`);
  });

  it("should update a vacation", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock
      .mockReturnValueOnce(vacationExample)
      .mockReturnValueOnce([])
      .mockReturnValueOnce(undefined);
    bossMock.mockResolvedValueOnce(bossFixture);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 30 });
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.data.updateVacation).toBeTruthy;
  });

  it("shouldn't update a vacation if it doesn't exists", async () => {
    vacationMock.mockReturnValueOnce(null);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 30 });
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Vacation doesn't exists."
    );
  });

  it("shouldn't update a vacation if it's type doesn't exists", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock.mockReturnValueOnce(vacationExample);
    bossMock.mockResolvedValueOnce(bossFixture);
    const query = updateVacationMutation({ ...vacationExample, type: "bar" });
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("shouldn't update a vacation if it's daysQtd don't match it's type", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock.mockReturnValueOnce(vacationExample);
    bossMock.mockResolvedValueOnce(bossFixture);
    const query = updateVacationMutation({
      ...vacationExample,
      daysQtd: 1,
      type: "license"
    });
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't update a vacation if there's another vacation in the given time period", async () => {
    const startDate = new Date("2023-02-25T17:35:31.308Z");
    workerMock.mockReturnValueOnce(workerExample);
    vacationMock.mockReturnValueOnce(vacationExample).mockReturnValueOnce([
      {
        _id: 1,
        endDate: add(startDate, { days: 15 }),
        startDate,
        worker: workerExample
      },
      {
        _id: 2,
        endDate: add(startDate, { days: 15 }),
        startDate,
        worker: workerExample
      }
    ]);
    bossMock.mockResolvedValueOnce(bossFixture);
    const query = updateVacationMutation({ ...vacationExample, daysQtd: 15 });
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("updateVacation");
    expect(body.singleResult?.errors?.[0].message)
      .toEqual(`This worker have vacations in the same period of the requested vacation: 
id: 1
worker: 6414697eb7d80144bcc86171 (Joseph Climber)
startDate: 25/02/2023
endDate: 12/03/2023
id: 2
worker: 6414697eb7d80144bcc86171 (Joseph Climber)
startDate: 25/02/2023
endDate: 12/03/2023`);
  });

  it("should delete a vacation", async () => {
    vacationMock
      .mockReturnValueOnce(vacationExample)
      .mockResolvedValueOnce(undefined);
    const query = deleteVacationMutation;
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("deleteVacation");
    expect(body.singleResult?.data.deleteVacation).toBeTruthy;
  });

  it("should do nothing if delete and id doesn't exists", async () => {
    vacationMock.mockReturnValueOnce(null);
    const query = deleteVacationMutation;
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data).toHaveProperty("deleteVacation");
    expect(body.singleResult?.errors?.[0].message).toEqual(
      "Vacation doesn't exists."
    );
  });
});
