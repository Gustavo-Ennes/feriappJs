import { endOfToday, startOfToday } from "date-fns";
import { describe, expect, it } from "vitest";

import { buildOptions } from "../resolvers/query/utils";

describe("Query utils tests", () => {
  it("should return a object with worker prop", () => {
    const response = buildOptions({ fromWorker: "12312312" });
    expect(response).to.deep.equals({ worker: "12312312" });
  });
  it("should return a object with type prop", () => {
    const response = buildOptions({ type: "12312312" });
    expect(response).to.deep.equals({ type: "12312312" });
  });
  it("should return a object with deferred prop", () => {
    const response = buildOptions({ deferred: false });
    expect(response).to.deep.equals({ deferred: false });
  });
  it("should return startDate less than today's start when period is 'past'", () => {
    const response = buildOptions({ period: "past" });
    expect(response).to.deep.equals({
      endDate: { $lt: startOfToday().toISOString() }
    });
  });
  it("should return startDate more than today's end when period is 'future'", () => {
    const response = buildOptions({ period: "future" });
    expect(response).to.deep.equals({
      startDate: { $gt: endOfToday().toISOString() }
    });
  });
  it("should return startDate(begin of today) and endDate(end of today) when period is present", () => {
    const response = buildOptions({ period: "present" });
    expect(response).to.deep.equals({
      $and: [
        { startDate: { $lte: endOfToday().toISOString() } },
        { endDate: { $gte: startOfToday().toISOString() } }
      ]
    });
  });
});
