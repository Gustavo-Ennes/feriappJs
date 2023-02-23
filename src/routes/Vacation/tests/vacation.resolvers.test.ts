import { expect } from "chai";
import { clone, reject } from "ramda";

import { server } from "../../../../app";
import { workerMock, vacationMock } from "../../../utils/mocks";
import {
  vacationsQuery,
  vacationQuery,
  createVacationMutation,
  deleteVacationMutation,
  updateVacationMutation,
  vacationsFromQuery,
} from "./queries";
import { validationPipe } from "../resolvers/mutation/validationPipe";
import { vacationExample } from "./vacation.example";
import { workerExample } from "../../Worker/tests/worker.example";

describe("Vacation: integration", () => {
  it("should list the vacations", async () => {
    vacationMock.expects("findAll").resolves([vacationExample]);
    const { body }: any = await server.executeOperation({
      query: vacationsQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("vacations")
      .that.deep.equals([
        {
          workerId: "1",
          id: "1",
        },
      ]);
  });

  it("should list the vacations from a specific worker", async () => {
    vacationMock.expects("findAll").resolves([vacationExample]);
    const { body }: any = await server.executeOperation({
      query: vacationsFromQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("vacations")
      .that.deep.equals([
        {
          workerId: "1",
          id: "1",
        },
      ]);
  });

  it("should list a vacation by id", async () => {
    vacationMock.expects("findByPk").resolves(vacationExample);
    const { body }: any = await server.executeOperation({
      query: vacationQuery,
    });

    expect(body.singleResult?.data)
      .to.have.property("vacation")
      .that.deep.equals({
        workerId: "1",
        id: "1",
      });
  });

  it("should create a vacation", async () => {
    const query = createVacationMutation({});
    workerMock.expects("findByPk").resolves(workerExample);
    vacationMock.expects("create").resolves(vacationExample);

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("createVacation")
      .that.deep.equals({
        id: "1",
        workerId: "1",
      });
  });

  it("shouldn't create a vacation if type doesn't exists", async () => {
    const query = createVacationMutation({ type: "foo" });
    workerMock.expects("findByPk").resolves(workerExample);
    vacationMock.expects("create").resolves(vacationExample);

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("createVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals(
        "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
      );
  });

  it("shouldn't create a vacation if daysQtd dont't match type", async () => {
    const query = createVacationMutation({ type: "dayOff", daysQtd: 60 });
    workerMock.expects("findByPk").resolves(workerExample);
    vacationMock.expects("create").resolves(vacationExample);

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("createVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Days quantity don't match vacation type.");
  });

  it("shouldn't create a vacation if there's another worker's vacation in given period", async () => {
    const query = createVacationMutation({});
    const workerExampleClone = clone(workerExample);
    workerExampleClone.getVacations = () => [{ id: 1 }];
    workerMock.expects("findByPk").resolves(workerExampleClone);

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("createVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals(
        "There are another vacation(s) within the given vacation payload period."
      );
  });

  it("should update a vacation", async () => {
    vacationMock.expects("findByPk").resolves(vacationExample);
    workerMock.expects("findByPk").resolves(workerExample);
    const query = updateVacationMutation({ id: 1, daysQtd: 30 });

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateVacation")
      .that.deep.equals(true);
  });

  it("shouldn't update a vacation if it doesn't exists", async () => {
    vacationMock.expects("findByPk").resolves(null);
    const query = updateVacationMutation({ id: 1, daysQtd: 30 });

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Vacation doesn't exists.");
  });

  it("shouldn't update a vacation if it's type doesn't exists", async () => {
    vacationMock.expects("findByPk").resolves(vacationExample);
    workerMock.expects("findByPk").resolves(workerExample);
    const query = updateVacationMutation({ id: 1, type: "bar" });

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals(
        "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
      );
  });

  it("shouldn't update a vacation if it's daysQtd don't match it's type", async () => {
    vacationMock.expects("findByPk").resolves(vacationExample);
    workerMock.expects("findByPk").resolves(workerExample);
    const query = updateVacationMutation({
      id: 1,
      type: "license",
      daysQtd: 1,
    });

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Days quantity don't match vacation type.");
  });

  it("shouldn't update a vacation if there's another vacation in the given time period", async () => {
    const workerExampleClone = clone(workerExample);
    workerExampleClone.getVacations = () => [{ id: 1 }];
    vacationMock.expects("findByPk").resolves(vacationExample);
    workerMock.expects("findByPk").resolves(workerExampleClone);
    const query = updateVacationMutation({ id: 1 });

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("updateVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals(
        "There are another vacation(s) within the given vacation payload period."
      );
  });

  it("should delete a vacation", async () => {
    vacationMock.expects("findByPk").resolves(vacationExample);
    const query = deleteVacationMutation;

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteVacation")
      .that.deep.equals(true);
  });

  it("should do nothing if delete and id doesn't exists", async () => {
    vacationMock.expects("findByPk").resolves(null);
    const query = deleteVacationMutation;

    const { body }: any = await server.executeOperation({
      query,
    });

    expect(body.singleResult?.data)
      .to.have.property("deleteVacation")
      .that.deep.equals(null);
    expect(body.singleResult?.errors?.[0])
      .to.have.property("message")
      .that.deep.equals("Vacation doesn't exists.");
  });
});
