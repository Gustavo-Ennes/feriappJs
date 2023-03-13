import { expect } from "chai";
import { clone, reject } from "ramda";

import { vacationMock, workerMock } from "../../../utils/mocks";
import { workerExample } from "../../Worker/tests/worker.example";
import { validationPipe } from "../resolvers/mutation/validationPipe";
import { vacationExample } from "./vacation.example";

describe("Vacation: Validation pipe", () => {
  it("should validate if all validation succeed", async () => {
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);
    const { payload, errorMessage } = await validationPipe(vacationExample);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouln't validate if not found a valid worker", async () => {
    workerMock.expects("findById").resolves(null);
    const { payload, errorMessage } = await validationPipe(vacationExample);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals("Worker ID not found");
  });

  it("should validate if type equals license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should validate if type equals dayOff", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 1;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't validate if found a valid type", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "anyone";
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Type not found. Types allowed: 'dayOff', 'vacation' and 'license'."
    );
  });

  it("should allow a 1 day dayOff", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 1;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow a half-day day dayOff", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 0.5;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 15 day dayOff", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "dayOff";
    vacationExampleClone.daysQtd = 15;
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("should allow a 30 day vacation", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.daysQtd = 30;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 60 day vacation", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.daysQtd = 60;
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("should allow a 15 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 15;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow a 60 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 15;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("should allow a 90 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 15;
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}]);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.empty;
  });

  it("shouldn't allow a 1 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 1;
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow a 12 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 1;
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow a 76 day license", async () => {
    const vacationExampleClone = clone(vacationExample);
    vacationExampleClone.type = "license";
    vacationExampleClone.daysQtd = 1;
    workerMock.expects("findById").resolves(workerExample);

    const { payload, errorMessage } = await validationPipe(
      vacationExampleClone
    );
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "Days quantity don't match vacation type."
    );
  });

  it("shouldn't allow if there's another vacation in given time period", async () => {
    workerExample.getVacations = () => [
      {
        id: 1,
      },
    ];
    workerMock.expects("findById").resolves(workerExample);
    vacationMock.expects("find").resolves([{}, {}]);

    const { payload, errorMessage } = await validationPipe(vacationExample);
    expect(payload).not.to.be.empty;
    expect(errorMessage).to.be.equals(
      "There are another vacation(s) within the given vacation payload period."
    );
  });
});
