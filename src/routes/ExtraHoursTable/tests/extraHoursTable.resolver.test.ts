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
import {
  getExtraHoursTableFixture,
  idWorkers,
  populatedWorkers,
} from "./extraHoursTable.fixture";

describe("Update ExtraHoursTable model tests", async () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get the table", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: extraHoursTableQuery,
      variables: { _id: "1" },
    });
    console.log(
      "🚀 ~ file: extraHoursTable.resolver.test.ts:35 ~ it ~ body:",
      JSON.stringify(body, null, 2)
    );
    expect(body.singleResult?.data)
      .to.have.property("extraHoursTable")
      .that.deep.equals(dissoc("save", fixture));
  });

  it("should get the table", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    extraHoursTableMock.mockResolvedValueOnce([fixture]);

    const { body }: any = await server.executeOperation({
      query: extraHourTablesQuery,
    });
    expect(body.singleResult?.data)
      .to.have.property("extraHoursTables")
      .that.deep.equals([dissoc("save", fixture)]);
  });

  it("should create a table without days", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    input.days = [];
    fixture.days = [];
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: createExtraHourTableMutation,
      variables: {
        extraHoursTableInput: input,
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHoursTable")
      .that.deep.equals(input);
  });

  it("should create a table with days", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: createExtraHourTableMutation,
      variables: {
        extraHoursTableInput: input,
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("createExtraHoursTable")
      .that.deep.equals(dissoc("save", fixture));
  });

  it("should should update a referece in an extraHoursTable", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    fixture.reference = "05-2025";
    input.reference = "05-2025";
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: input,
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should update a day in an extraHoursTable", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    fixture.days[0] = { number: 2, hours: [populatedWorkers[2]] };
    input.days[0] = { number: 2, hours: [idWorkers[2]] };
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", input),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should update an hour in a day in an extraHoursTable", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    fixture.days[0].hours[0] = populatedWorkers[2];
    input.days[0].hours[0] = idWorkers[2];
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", input),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove an hour in a day in an extraHoursTable", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    fixture.days[0].hours.pop();
    input.days[0].hours.pop();
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", input),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove a day in a extraHoursTable", async () => {
    const fixture = getExtraHoursTableFixture("populated");
    const input = getExtraHoursTableFixture("id");
    fixture.days.pop();
    input.days.pop();
    extraHoursTableMock.mockResolvedValueOnce(fixture);

    const { body }: any = await server.executeOperation({
      query: updateExtraHourTableMutation,
      variables: {
        extraHoursTableInput: dissoc("save", input),
      },
    });
    expect(body.singleResult?.data)
      .to.have.property("updateExtraHoursTable")
      .that.deep.equals(true);
  });

  it("should should remove an extraHoursTable", async () => {
    extraHoursTableMock.mockResolvedValueOnce(
      getExtraHoursTableFixture("populated")
    );
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
