import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { workerMock } from "../../../../../utils/mockApplication";
import { workerExample } from "../../../tests/worker.example";
import { validateMatriculationNumbers } from "./matriculation";

describe("Matriculation and registry validations", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should validate if matriculation or registry is unique", async (): Promise<void> => {
    workerMock.mockReturnValueOnce([]).mockReturnValueOnce([]);
    const response = await validateMatriculationNumbers(workerExample);
    expect(response).toHaveProperty("success", true);
    expect(response).toHaveProperty("error", undefined);
  });

  it("shouldn't validate if the matriculation number already exists", async (): Promise<void> => {
    workerMock.mockReturnValueOnce([{}]);
    const response = await validateMatriculationNumbers(workerExample);
    expect(response).toHaveProperty("success", false);
    expect(response).toHaveProperty("error", "Conflict: matriculation exists");
  });

  it("shouldn't validate if the matriculation number already exists", async (): Promise<void> => {
    workerMock.mockReturnValueOnce([]).mockReturnValueOnce([{}]);
    const response = await validateMatriculationNumbers(workerExample);
    expect(response).toHaveProperty("success", false);
    expect(response).toHaveProperty("error", "Conflict: registry exists");
  });
});
