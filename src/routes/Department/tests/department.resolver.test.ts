import { expect } from "chai";

import { departmentMock } from "../../../utils/mocks";
import { server } from "../../../../app";
import {
  departmentQuery,
  departmentsQuery,
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation,
} from "./queries";

describe("Department integration tests", async () => {
  it("Should list departments", async () => {
    departmentMock.expects("find").resolves([
      {
        _id: "1",
        name: "department 1",
      },
    ]);

    const { body }: any = await server.executeOperation({
      query: departmentsQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("departments")
      .that.deep.equals([
        {
          name: "department 1",
        },
      ]);
  });

  it("Should get a department by id", async () => {
    departmentMock.expects("findById").resolves({
      _id: "1",
      name: "department 1",
    });

    const { body }: any = await server.executeOperation({
      query: departmentQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("department")
      .that.deep.equals({
        name: "department 1",
      });
  });

  it("Should return null if don't find a department by pk", async () => {
    departmentMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: departmentQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("department")
      .that.deep.equals(null);
  });

  it("should create a department", async () => {
    departmentMock
      .expects("create")
      .resolves({ name: "department 1", _id: "1" });

    const { body }: any = await server.executeOperation({
      query: createDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("createDepartment")
      .that.deep.equals({
        name: "department 1",
        _id: "1",
      });
  });

  it("should delete a department", async () => {
    departmentMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: deleteDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteDepartment")
      .that.deep.equals(false);
  });

  it("should update a department", async () => {
    departmentMock
      .expects("findById")
      .resolves({ name: "department 1", _id: "1", save: () => true });
    departmentMock.expects("updateOne").resolves(undefined);

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(true);
  });

  it("should do nothing if no such department exists", async () => {
    departmentMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(false);
  });
});

//TODO fix tests
