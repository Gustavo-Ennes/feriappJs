import { expect } from "chai";

import { buildOptions } from "../resolvers/query/utils";
import { todayEndDate, todayStartDate } from "../vacation.utils";

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
  it("should return a object with enjoyed prop", () => {
    const response = buildOptions({ enjoyed: true });
    expect(response).to.deep.equals({ enjoyed: true });
  });
  it("should return startDate in past when period prop equals 'past'", () => {
    const response = buildOptions({ period: "past" });
    expect(response).to.deep.equals({ startDate: { $lt: todayStartDate } });
  });
  it("should return startDate in past when period prop equals 'future'", () => {
    const response = buildOptions({ period: "future" });
    expect(response).to.deep.equals({ startDate: { $gt: todayEndDate } });
  });
  it("should return startDate in past when period prop equals 'present'", () => {
    const response = buildOptions({ period: "present" });
    expect(response).to.deep.equals({
      endDate: { $gte: todayEndDate },
      startDate: { $lte: todayEndDate },  
    });
  });
});
