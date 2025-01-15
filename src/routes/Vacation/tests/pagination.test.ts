/* eslint-disable @typescript-eslint/no-explicit-any */
import { last } from "ramda";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { vacationMock } from "../../../utils/mockApplication";
import { VacationInterface } from "../types/vacation";
import { vacationsQuery } from "./queries";
import { vacationExample } from "./vacation.example";

describe("Vacation: pagination", async () => {
  const { server } = await import("../../../../app");

  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if page requested is beyond query results", async () => {
    const vacationQuantity = 100;
    const vacations = Array(vacationQuantity).fill(vacationExample);

    vacationMock.mockResolvedValueOnce(vacations);

    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
      variables: { page: 11 }
    });

    expect(body.singleResult?.data.vacations).toHaveProperty("totalPages", 0);
    expect(body.singleResult?.data.vacations.items).to.be.empty;
    expect(body.singleResult?.data.vacations).toHaveProperty("pageNumber", 0);
    expect(body.singleResult?.data.vacations).toHaveProperty("error");
  });

  it("should return one empty page", async () => {
    vacationMock.mockResolvedValueOnce([]);

    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
      variables: { page: 1 }
    });

    expect(body.singleResult?.data.vacations).toHaveProperty("totalPages", 1);
    expect(body.singleResult?.data.vacations.items).to.be.empty;
    expect(body.singleResult?.data.vacations).toHaveProperty("pageNumber", 1);
    expect(body.singleResult?.data.vacations).to.have.property("error", null);
  });

  it("should return one page with results", async () => {
    const vacationQuantity = 18;
    const vacations = Array(vacationQuantity).fill(vacationExample);

    vacationMock.mockResolvedValueOnce(vacations);

    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
      variables: { page: 1 }
    });

    const resultIds = body.singleResult?.data.vacations.items.map(
      (item: VacationInterface) => item._id
    );
    const vacationIds = vacations.map((vacation) => vacation._id);

    expect(body.singleResult?.data.vacations).toHaveProperty("totalPages", 1);
    expect(body.singleResult?.data.vacations).toHaveProperty("pageNumber", 1);
    expect(body.singleResult?.data.vacations).to.have.property("error", null);
    expect(resultIds).to.deep.equals(vacationIds);
  });

  it("should return the tenth page with just one result", async () => {
    const vacationQuantity = 181;
    const vacations = Array(vacationQuantity).fill(vacationExample);

    vacationMock.mockResolvedValueOnce(vacations);

    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
      variables: { page: 10 }
    });

    expect(body.singleResult?.data.vacations).toHaveProperty("totalPages", 10);
    expect(body.singleResult?.data.vacations).toHaveProperty("pageNumber", 10);
    expect(body.singleResult?.data.vacations.items).toHaveLength(1);
    expect(body.singleResult?.data.vacations.items[0]).toHaveProperty(
      "_id",
      last(vacations)._id
    );
    expect(body.singleResult?.data.vacations).to.have.property("error", null);
  });
});
