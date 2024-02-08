/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { departmentMock } from "../../../utils/mockApplication";
import { departmentFixture } from "./department.fixture";
import {
  createDepartmentMutation,
  deleteDepartmentMutation,
  departmentQuery,
  departmentsQuery,
  updateDepartmentMutation,
} from "./queries";

describe("Department integration tests", async () => {
  const {server} = await import("../../../../app")

  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should list departments", async () => {
    departmentMock.mockResolvedValueOnce([departmentFixture]);

    const { body }: any = await server.executeOperation({
      query: departmentsQuery,
    });
    expect(body.singleResult?.data)
      .to.have.property("departments")
      .that.deep.equals([departmentFixture]);
  });

  it("Should get a department by id", async () => {
    departmentMock.mockResolvedValueOnce(departmentFixture);

    const { body }: any = await server.executeOperation({
      query: departmentQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("department")
      .that.deep.equals(departmentFixture);
  });

  it("Should return null if don't find a department by pk", async () => {
    departmentMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: departmentQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("department")
      .that.deep.equals(null);
  });

  it("should create a department", async () => {
    departmentMock.mockResolvedValueOnce(departmentFixture);

    const { body }: any = await server.executeOperation({
      query: createDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("createDepartment")
      .that.deep.equals(departmentFixture);
  });

  it("should delete a department", async () => {
    departmentMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: deleteDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteDepartment")
      .that.deep.equals(false);
  });

  it("should update a department", async () => {
    departmentMock
      .mockResolvedValueOnce([departmentFixture])
      .mockResolvedValueOnce(undefined);

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(true);
  });

  it("should do nothing if no such department exists", async () => {
    departmentMock.mockResolvedValueOnce(null);

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(false);
  });
});
