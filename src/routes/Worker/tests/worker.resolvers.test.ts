import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import {
  workerMock,
  departmentMock,
  vacationMock
} from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  workerQuery,
  workersQuery,
  createWorkerMutation,
  deleteWorkerMutation,
  updateWorkerMutation
} from "./queries";
import { workerExample } from "./worker.example";
import { workerDefaultObjectId } from "../../Vacation/tests/queries";

describe("Workers integration tests", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should list workers", async () => {
    workerMock.mockReturnValueOnce([workerExample]);
    const { body }: any = await server.executeOperation({
      query: workersQuery
    });
    expect(body.singleResult?.data)
      .to.have.property("workers")
      .that.deep.equals([
        {
          name: "Joseph Climber"
        }
      ]);
  });

  it("Should return empty array when no workers", async () => {
    workerMock.mockReturnValueOnce([]);
    const { body }: any = await server.executeOperation({
      query: workersQuery
    });
    expect(body.singleResult?.data)
      .to.have.property("workers")
      .that.deep.equals([]);
  });

  it("Should return worker by id", async () => {
    workerMock.mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query: workerQuery
    });
    expect(body.singleResult?.data)
      .to.have.property("worker")
      .that.deep.equals({ name: "Joseph Climber" });
  });

  it("Should return null if worker doesn't exists", async () => {
    workerMock.mockReturnValueOnce(null);
    const { body }: any = await server.executeOperation({
      query: workerQuery
    });
    expect(body.singleResult?.data)
      .to.have.property("worker")
      .that.deep.equals(null);
  });

  it("should create a worker", async () => {
    departmentMock.mockReturnValueOnce({ _id: "1", name: "Healthcare" });
    workerMock
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(workerExample);
    const { body }: any = await server.executeOperation({
      query: createWorkerMutation
    });
    expect(body.singleResult?.data)
      .to.have.property("createWorker")
      .that.deep.equals({
        name: "Joseph Climber",
        _id: workerDefaultObjectId
      });
  });

  it("shouldn't create a worker if there's another worker with same matriculation number", async () => {
    departmentMock.mockReturnValueOnce({ _id: "1", name: "Healthcare" });
    workerMock.mockReturnValueOnce([{}]);
    const { body }: any = await server.executeOperation({
      query: createWorkerMutation
    });
    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: matriculation exists"
    );
  });

  it("shouldn't create a worker if there's another worker with same registry number", async () => {
    departmentMock.mockReturnValueOnce({ _id: "1", name: "Healthcare" });
    workerMock.mockReturnValueOnce([]).mockReturnValueOnce([{}]);
    const { body }: any = await server.executeOperation({
      query: createWorkerMutation
    });
    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: registry exists"
    );
  });

  it("shouldn't create a worker if it's deparment doesn't exists", async () => {
    const { body }: any = await server.executeOperation({
      query: createWorkerMutation
    });
    expect(body.singleResult?.data)
      .to.have.property("createWorker")
      .that.deep.equals(null);
    expect(body.singleResult).to.have.property("errors");
  });

  it("should update a worker", async () => {
    workerMock
      .mockReturnValueOnce(workerExample)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(true);
    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation
    });
    expect(body.singleResult?.data)
      .to.have.property("updateWorker")
      .that.deep.equals(true);
  });

  it("shouldn't update a worker if there's another worker with same matriculation number", async () => {
    workerMock.mockReturnValueOnce(workerExample).mockReturnValueOnce([{}]);
    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation
    });
    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: matriculation exists"
    );
  });

  it("shouldn't update a worker if there's another worker with same registry number", async () => {
    workerMock
      .mockReturnValueOnce(workerExample)
      .mockReturnValueOnce([])
      .mockReturnValueOnce([{}]);
    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation
    });
    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "validation error: Conflict: registry exists"
    );
  });

  it("should do nothing if no such worker exists", async () => {
    // workerMock.mockReturnValueOnce(null);
    const { body }: any = await server.executeOperation({
      query: updateWorkerMutation
    });
    expect(body.singleResult).to.have.property("errors");
    expect(body.singleResult?.errors?.[0]).to.have.property(
      "message",
      "Worker doesn't exists."
    );
  });

  it("should delete a worker", async () => {
    workerMock
      .mockReturnValueOnce(workerExample)
      .mockReturnValueOnce(undefined);
    vacationMock.mockReturnValueOnce(undefined);
    const query = deleteWorkerMutation;
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data)
      .to.have.property("deleteWorker")
      .that.deep.equals(true);
  });

  it("should do nothing if delete and id doesn't exists", async () => {
    workerMock.mockReturnValueOnce(null);
    const query = deleteWorkerMutation;
    const { body }: any = await server.executeOperation({
      query
    });
    expect(body.singleResult?.data)
      .to.have.property("deleteWorker")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Worker doesn't exists.");
  });
});
