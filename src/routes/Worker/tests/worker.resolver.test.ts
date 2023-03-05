import { expect } from "chai";

import { server } from "../../../../app";
import { workerMock, departmentMock } from "../../../utils/mocks";
import {
  workerQuery,
  workersQuery,
  createWorkerMutation,
  deleteWorkerMutation,
  updateWorkerMutation,
} from "./queries";
import { workerExample } from "./worker.example";

describe("Workers integration tests", () => {
  it("Should list workers", async () => {
    workerMock.expects("find").resolves([workerExample]);

    const { body }: any = await server.executeOperation({
      query: workersQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("workers")
      .that.deep.equals([
        {
          name: "Joseph Climber",
        },
      ]);
  });

  it("Should return empty array when no workers", async () => {
    workerMock.expects("find").resolves([]);

    const { body }: any = await server.executeOperation({
      query: workersQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("workers")
      .that.deep.equals([]);
  });

  it("Should return worker by id", async () => {
    workerMock.expects("findById").resolves(workerExample);

    const { body }: any = await server.executeOperation({
      query: workerQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("worker")
      .that.deep.equals({ name: "Joseph Climber" });
  });

  it("Should return null if worker doesn't exists", async () => {
    workerMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: workerQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("worker")
      .that.deep.equals(null);
  });

  it("should create a worker", async () => {
    departmentMock
      .expects("findById")
      .resolves({ _id: "1", name: "Healthcare" });
    workerMock.expects("create").resolves(workerExample);

    const { body }: any = await server.executeOperation({
      query: createWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("createWorker")
      .that.deep.equals({
        name: "Joseph Climber",
        _id: "1",
      });
  });

  it("shouldn't create a worker if it's deparment doesn't exists", async () => {
    departmentMock.expects("findById").resolves(null);
    workerMock.expects("create").resolves(workerExample);

    const { body }: any = await server.executeOperation({
      query: createWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("createWorker")
      .that.deep.equals(null);
    expect(body.singleResult).to.have.property("errors");
  });

  it("should delete a worker", async () => {
    workerMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: deleteWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteWorker")
      .that.deep.equals(false);
  });

  it("should update a worker", async () => {
    workerMock.expects("findById").resolves(workerExample);
    workerMock.expects("updateOne").resolves(undefined);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateWorker")
      .that.deep.equals(true);
  });

  it("should do nothing if no such worker exists", async () => {
    workerMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateWorker")
      .that.deep.equals(false);
  });
});
