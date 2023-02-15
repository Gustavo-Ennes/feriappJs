import { mock } from "sinon";
import { expect } from "chai";

import { server } from "../../../../app";
import { DepartmentModel } from "../department.model";
import {
  departmentQuery,
  departmentsQuery,
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation,
} from "./queries";

describe("Department integration tests", async () => {
  const departmentMock = mock(DepartmentModel);

  it("Should list departments", async () => {
    departmentMock.expects("findAllThethindsintheworld").resolves([
      {
        id: 1,
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
    departmentMock.expects("findByPk").resolves({
      id: 1,
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
    departmentMock.expects("findByPk").resolves(null);

    const { body }: any = await server.executeOperation({
      query: departmentQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("department")
      .that.deep.equals(null);
  });

  it("should create a department", async () => {
    departmentMock.expects("create").resolves({ name: "department 1", id: 1 });

    const { body }: any = await server.executeOperation({
      query: createDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("createDepartment")
      .that.deep.equals({
        name: "department 1",
        id: "1",
      });
  });

  it("should delete a department", async () => {
    departmentMock.expects("findByPk").resolves({
      name: "department 1",
      id: 1,
      destroy: () => true,
    });

    const { body }: any = await server.executeOperation({
      query: deleteDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteDepartment")
      .that.deep.equals(true);
  });

  it("should delete a department", async () => {
    departmentMock.expects("findByPk").resolves(null);

    const { body }: any = await server.executeOperation({
      query: deleteDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteDepartment")
      .that.deep.equals(false);
  });

  it("should update a department", async () => {
    departmentMock
      .expects("findByPk")
      .resolves({ name: "department 1", id: 1, save: () => true });

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(true);
  });

  it("should do nothing if not such department exists", async () => {
    departmentMock.expects("findByPk").resolves(null);

    const { body }: any = await server.executeOperation({
      query: updateDepartmentMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateDepartment")
      .that.deep.equals(false);
  });
});