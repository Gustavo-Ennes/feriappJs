import { expect } from "chai";
import { Types } from "mongoose";

import { workerMock } from "../../../../../utils/mocks";
import { workerExample } from "../../../tests/worker.example";
import { validateMatriculationNumbers } from "./matriculation";

const workerInput = {
  name: "Gustavo",
  role: "Auxiliar",
  registry: "123121-1",
  matriculation: "212322",
  departmentId: new Types.ObjectId(),
};

describe("Matriculation and registry validations", () => {
  it("should validate if matriculation or registry is unique", async (): Promise<void> => {
    workerMock.expects("find").twice().resolves([]);
    const response = await validateMatriculationNumbers(workerExample);

    expect(response).to.have.property("success", true);
    expect(response).to.have.property("error", undefined);
  });

  it("shouldn't validate if the matriculation number already exists", async (): Promise<void> => {
    // find call by matriculation
    workerMock.expects("find").resolves([{}]);
    const response = await validateMatriculationNumbers(workerExample);

    expect(response).to.have.property("success", false);
    expect(response).to.have.property(
      "error",
      "Conflict: matriculation exists"
    );
  });

  it("shouldn't validate if the registry number already exists", async (): Promise<void> => {
    workerMock.expects("find").resolves([]);
    // find call by registry
    workerMock.expects("find").resolves([{}]);
    const response = await validateMatriculationNumbers(workerExample);

    expect(response).to.have.property("success", false);
    expect(response).to.have.property("error", "Conflict: registry exists");
  });
});
