import { describe, it, expect, afterEach, vi, beforeAll } from "vitest";
import { clone, dissoc, pick } from "ramda";

import { extraHoursTableMock } from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  createExtraHourTableMutation,
  updateExtraHourTableMutation,
  deleteExtrahourTableMutation,
  extraHoursTableQuery,
  extraHourTablesQuery,
} from "./queries";
import { extraHoursTableFixture } from "./extraHoursTable.fixture";

describe("Update ExtraHoursTable model pipe tests", async () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should get the table", async () => {
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: extraHoursTableQuery,
      variables: { _id: "1" },
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHoursTable")
      .that.deep.equals(dissoc("save", extraHoursTableFixture));
  });

  it("should get the table", async () => {
    extraHoursTableMock.mockResolvedValueOnce([extraHoursTableFixture]);

    const { body }: any = await server.executeOperation({
      query: extraHourTablesQuery,
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHoursTables")
      .that.deep.equals([dissoc("save", extraHoursTableFixture)]);
  });

  it("should create a table without days", async () => {
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const tableWithoutIdAndDays = pick(
      ["reference", "days", "save"],
      extraHoursTableFixture
    );
    tableWithoutIdAndDays.days = [];
    const { body }: any = await server.executeOperation({
      query: createExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithoutIdAndDays),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHoursTable")
      .that.deep.equals(dissoc("save", extraHoursTableFixture));
  });

  it("should create a table with days", async () => {
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const tableWithDays = pick(
      ["reference", "days", "save"],
      extraHoursTableFixture
    );
    const { body }: any = await server.executeOperation({
      query: createExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithDays),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHoursTable")
      .that.deep.equals(dissoc("save", extraHoursTableFixture));
  });

  it("should should update a referece in a extraHoursTable", async () => {
    const tableWithAnotherReference = clone(extraHoursTableFixture);
    tableWithAnotherReference.reference = "05-2023";
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithAnotherReference),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should update a day in a extraHoursTable", async () => {
    const tableWithDifferentDay = clone(extraHoursTableFixture);
    tableWithDifferentDay.days = [
      {
        number: 19,
        hours: [
          { workerId: "2", number: 1.2 },
          { workerId: "22", number: 2.3 },
        ],
      },
      {
        number: 20,
        hours: [{ workerId: "12", number: 0.3 }],
      },
      {
        number: 22,
        hours: [{ workerId: "22", number: 2.2 }],
      },
    ];
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithDifferentDay),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should update an hour in a day in a extraHoursTable", async () => {
    const tableWithDifferentHour = clone(extraHoursTableFixture);
    tableWithDifferentHour.days = [
      {
        number: 19,
        hours: [
          { workerId: "2", number: 12.2 },
          { workerId: "22", number: 2.3 },
        ],
      },
      {
        number: 20,
        hours: [{ workerId: "12", number: 0.3 }],
      },
      {
        number: 22,
        hours: [],
      },
    ];
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithDifferentHour),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove an hour in a day in a extraHoursTable", async () => {
    const tableWithRemovedHour = clone(extraHoursTableFixture);
    tableWithRemovedHour.days = [
      {
        number: 19,
        hours: [{ workerId: "2", number: 1.2 }],
      },
      {
        number: 20,
        hours: [{ workerId: "12", number: 0.3 }],
      },
      {
        number: 22,
        hours: [],
      },
    ];
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithRemovedHour),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove a day in a extraHoursTable", async () => {
    const tableWithRemovedDay = clone(extraHoursTableFixture);
    tableWithRemovedDay.days = [
      {
        number: 19,
        hours: [{ workerId: "2", number: 1.2 }],
      },
    ];
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", tableWithRemovedDay),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove a extraHoursTable", async () => {
    extraHoursTableMock.mockResolvedValueOnce(extraHoursTableFixture);
    const { body }: any = await server.executeOperation({
      query: deleteExtrahourTableMutation,
      variables: {
        _id: "1",
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("deleteExtraHoursTable")
      .that.deep.equals(true);
  });
});
