import { describe, it, expect, afterEach, vi, beforeAll } from "vitest";

import { extraHourMock } from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  createExtraHourMutation,
  updateExtraHourMutation,
  deleteExtraHourMutation,
  extraHourQuery,
  extraHoursQuery,
} from "./queries";
import { extraHourFixtures } from "./extraHour.fixture";
import { parse } from "date-fns";
import { dissoc } from "ramda";

describe("Update ExtraHoursTable model tests", async () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get an ExtraHour", async () => {
    extraHourMock.mockResolvedValueOnce(extraHourFixtures[0]);
    const extraHourInput = { _id: "1" };
    const { body }: any = await server.executeOperation({
      query: extraHourQuery,
      variables: { extraHourInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHour")
      .that.deep.equals(extraHourFixtures[0]);
  });

  it("should get extra all ExtraHours", async () => {
    extraHourMock.mockResolvedValueOnce(extraHourFixtures);
    const { body }: any = await server.executeOperation({
      query: extraHoursQuery,
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHours")
      .that.deep.equals(extraHourFixtures);
  });

  it("should get extraHours by a reference date range", async () => {
    extraHourMock.mockResolvedValueOnce([
      extraHourFixtures[0],
      extraHourFixtures[1],
    ]);
    const extraHourInput = {
      from: parse("01-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
      to: parse("02-01-2023", "dd-MM-yyyy", new Date()).toISOString(),
    };
    const { body }: any = await server.executeOperation({
      query: extraHoursQuery,
      variables: { extraHourInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHours")
      .that.deep.equals([extraHourFixtures[0], extraHourFixtures[1]]);
  });

  it("should create an extraHour", async () => {
    const clonedInput = { ...dissoc("_id", extraHourFixtures[0]), worker: "1" };
    extraHourMock.mockResolvedValueOnce(extraHourFixtures[0]);

    const { body }: any = await server.executeOperation({
      query: createExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHour")
      .that.deep.equals({
        ...extraHourFixtures[0],
        worker: {
          _id: "1",
          name: "Afonso",
        },
      });
  });

  it("shouldn't create an ExtraHour with a required props", async () => {
    const clonedInput = dissoc("_id", extraHourFixtures[1]);
    const inputWithoutWorkerId = dissoc("worker", clonedInput);
    extraHourMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: createExtraHourMutation,
      variables: { extraHourInput: inputWithoutWorkerId },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHour")
      .that.deep.equals(null);
  });

  it("should update an ExtraHour", async () => {
    const updatePayload = {
      ...extraHourFixtures[0],
      worker: "2",
    };
    extraHourMock.mockResolvedValueOnce({
      ...extraHourFixtures[0],
      worker: { _id: "2", name: "Julio" },
    });

    const { body }: any = await server.executeOperation({
      query: updateExtraHourMutation,
      variables: { extraHourInput: updatePayload },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHour")
      .that.deep.equals(true);
  });

  it("shouldn't update an ExtraHour without an id", async () => {
    const updatePayload = {
      ...dissoc("_id", extraHourFixtures[0]),
      worker: "1",
    };
    extraHourMock.mockResolvedValueOnce(false);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourMutation,
      variables: { extraHourInput: updatePayload },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHour")
      .that.deep.equals(false);
  });

  it("shouldn't delete an ExtraHour without a valid id", async () => {
    extraHourMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: deleteExtraHourMutation,
      variables: { _id: "invalidId" },
    });
    expect(body.singleResult?.data)
      .to.have.property("deleteExtraHour")
      .that.deep.equals(false);
  });

  it("should delete an ExtraHour", async () => {
    extraHourMock
      .mockResolvedValueOnce(extraHourFixtures[1])
      .mockResolvedValueOnce(undefined);

    const { body }: any = await server.executeOperation({
      query: deleteExtraHourMutation,
      variables: { _id: "1" },
    });
    expect(body.singleResult?.data)
      .to.have.property("deleteExtraHour")
      .that.deep.equals(true);
  });
});
