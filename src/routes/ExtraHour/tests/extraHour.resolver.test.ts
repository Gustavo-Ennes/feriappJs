import { describe, it, expect, afterEach, vi, beforeAll } from "vitest";
import { parse } from "date-fns";
import { assoc, clone, dissoc, pipe } from "ramda";

import { extraHourMock } from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  processExtraHourMutation,
  extraHourQuery,
  extraHoursQuery,
} from "./queries";
import { extraHourFixtures, extraHourInputFixture } from "./extraHour.fixture";
import { ExtraHourInput } from "../types/extraHour";

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

  it("should process new extraHours", async () => {
    const clonedInput = extraHourInputFixture.map((extraHour) =>
      dissoc("_id" as never, extraHour)
    );
    extraHourMock.mockResolvedValueOnce(true);

    const {
      body: {
        singleResult: { data },
      },
    }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    expect(data).to.have.property("processExtraHours").that.deep.equals({
      created: clonedInput.length,
      deleted: 0,
      updated: 0,
    });
  });

  it("should create process new ExtraHours with nightly extra hours", async () => {
    const clonedInput = extraHourInputFixture.map((extraHourFixture) =>
      pipe(
        dissoc("_id"),
        assoc("nightlyAmount", Math.ceil(Math.random() * 5))
      )(extraHourFixture)
    );
    extraHourMock.mockResolvedValueOnce(true);

    const { body }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("processExtraHours")
      .that.deep.equals({
        created: clonedInput.length,
        deleted: 0,
        updated: 0,
      });
  });

  it("should process extraHours to update", async () => {
    const clonedInput = extraHourInputFixture.map((extraHourFixture) =>
      assoc("nightlyAmount", Math.ceil(Math.random() * 5), extraHourFixture)
    );
    extraHourMock.mockResolvedValueOnce(true);

    const { body }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("processExtraHours")
      .that.deep.equals({
        created: 0,
        deleted: 0,
        updated: clonedInput.length,
      });
  });

  it("should process extraHours to delete", async () => {
    const clonedInput = extraHourInputFixture.map((extraHourFixture) =>
      pipe(assoc("nightlyAmount", 0), assoc("amount", 0))(extraHourFixture)
    );
    extraHourMock.mockResolvedValueOnce(true);

    const { body }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    expect(body.singleResult?.data)
      .to.have.property("processExtraHours")
      .that.deep.equals({
        created: 0,
        deleted: clonedInput.length,
        updated: 0,
      });
  });

  it("should process a variaty of extraHours", async () => {
    const clonedInput = clone(extraHourInputFixture);
    // to delete
    clonedInput[0].amount = 0;
    clonedInput[0].nightlyAmount = 0;
    // to create
    clonedInput[1]._id = "";
    extraHourMock.mockResolvedValueOnce(true);

    const {
      body: {
        singleResult: { data, errors },
      },
    }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: clonedInput },
    });
    console.log(
      "🚀 ~ file: extraHour.resolver.test.ts:154 ~ it ~ errors:",
      errors
    );
    expect(data)
      .to.have.property("processExtraHours")
      .that.deep.equals({
        created: 1,
        deleted: 1,
        updated: extraHourFixtures.length - 2,
      });
  });

  it("should do nothing with an empty array in extraHourInput parameter", async () => {
    const emptyInput: ExtraHourInput[] = [];

    const {
      body: {
        singleResult: { data, errors },
      },
    }: any = await server.executeOperation({
      query: processExtraHourMutation,
      variables: { extraHourInput: emptyInput },
    });
    expect(data).to.have.property("processExtraHours").that.deep.equals({
      created: 0,
      deleted: 0,
      updated: 0,
    });
  });
});
