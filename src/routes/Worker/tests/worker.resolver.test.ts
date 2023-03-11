import { expect } from "chai";

import { server } from "../../../../app";
import { workerMock, departmentMock, vacationMock } from "../../../utils/mocks";
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
    workerMock.expects("find").twice().resolves([]);

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

  it("shouldn't create a worker if there's another worker with same matriculation number", async () => {
    departmentMock
      .expects("findById")
      .resolves({ _id: "1", name: "Healthcare" });
    workerMock.expects("create").resolves(workerExample);
    workerMock.expects("find").resolves([{}]);

    const { body }: any = await server.executeOperation({
      query: createWorkerMutation,
    });

    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: matriculation exists"
    );
  });

  it("shouldn't create a worker if there's another worker with same registry number", async () => {
    departmentMock
      .expects("findById")
      .resolves({ _id: "1", name: "Healthcare" });
    workerMock.expects("create").resolves(workerExample);
    workerMock.expects("find").resolves([]);
    // mocking pipe finding worker by registry
    workerMock.expects("find").resolves([{}]);

    const { body }: any = await server.executeOperation({
      query: createWorkerMutation,
    });

    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: registry exists"
    );
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

  it("should update a worker", async () => {
    workerMock.expects("findById").resolves(workerExample);
    workerMock.expects("updateOne").resolves(undefined);
    workerMock.expects("find").twice().resolves([]);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateWorker")
      .that.deep.equals(true);
  });

  it("shouldn't update a worker if there's another worker with same matriculation number", async () => {
    workerMock.expects("findById").resolves(workerExample);
    workerMock.expects("updateOne").resolves(undefined);
    workerMock.expects("find").resolves([{}]);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: matriculation exists"
    );
  });

  it("shouldn't update a worker if there's another worker with same registry number", async () => {
    workerMock.expects("findById").resolves(workerExample);
    workerMock.expects("updateOne").resolves(undefined);
    workerMock.expects("find").resolves([]);
    workerMock.expects("find").resolves([{}]);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: registry exists"
    );
  });

  it("should do nothing if no such worker exists", async () => {
    workerMock.expects("findById").resolves(null);

    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation,
    });

    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "Worker doesn't exists."
    );
  });

  it("should delete a worker", async () => {
    workerMock.expects("findById").resolves(workerExample);
    workerMock.expects("deleteOne").resolves(undefined);
    vacationMock.expects("deleteMany").resolves(undefined);

    const query = deleteWorkerMutation;

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteWorker")
      .that.deep.equals(true);
  });

  it("should do nothing if delete and id doesn't exists", async () => {
    workerMock.expects("findById").resolves(null);
    const query = deleteWorkerMutation;

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteWorker")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Worker doesn't exists.");
  });
});
