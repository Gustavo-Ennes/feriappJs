/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { bossMock } from "../../../utils/mockApplication";
import { bossFixture } from "./boss.fixture";
import {
  createBossMutation,
  deleteBossMutation,
  bossQuery,
  bossesQuery,
  updateBossMutation
} from "./queries";

describe("Boss integration tests", async () => {
  const { server } = await import("../../../../app");

  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should list bosses", async () => {
    bossMock.mockReturnValueOnce([bossFixture]);

    const { body }: any = await server.executeOperation({
      query: bossesQuery
    });
    expect(body.singleResult?.data)
      .to.have.property("bosses")
      .that.deep.equals([bossFixture]);
  });

  it("Should get a boss by id", async () => {
    bossMock.mockResolvedValueOnce(bossFixture);

    const { body }: any = await server.executeOperation({
      query: bossQuery
    });

    expect(body.singleResult?.data)
      .to.have.property("boss")
      .that.deep.equals(bossFixture);
  });

  it("Should return null if don't find a boss by pk", async () => {
    bossMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: bossQuery
    });

    expect(body.singleResult?.data)
      .to.have.property("boss")
      .that.deep.equals(null);
  });

  it("should create a boss", async () => {
    bossMock.mockResolvedValueOnce(bossFixture);

    const { body }: any = await server.executeOperation({
      query: createBossMutation
    });

    expect(body.singleResult?.data)
      .to.have.property("createBoss")
      .that.deep.equals(bossFixture);
  });

  it("should delete a boss", async () => {
    bossMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: deleteBossMutation
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteBoss")
      .that.deep.equals(false);
  });

  it("should update a boss", async () => {
    bossMock
      .mockResolvedValueOnce([bossFixture])
      .mockResolvedValueOnce(undefined);

    const { body }: any = await server.executeOperation({
      query: updateBossMutation
    });

    expect(body.singleResult?.data)
      .to.have.property("updateBoss")
      .that.deep.equals(true);
  });

  it("should do nothing if no such boss exists", async () => {
    bossMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: updateBossMutation
    });

    expect(body.singleResult?.data)
      .to.have.property("updateBoss")
      .that.deep.equals(false);
  });
});
