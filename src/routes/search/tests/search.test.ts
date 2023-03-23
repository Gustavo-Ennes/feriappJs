import {
  describe,
  expect,
  it,
  afterEach,
  vi,
  beforeAll,
  beforeEach,
} from "vitest";

import {
  workerMock,
  vacationMock,
  departmentMock,
} from "../../../utils/mockApplication";
import { server } from "../../../../app";
import { searchQuery } from "./queries";
import {
  workerExamples,
  departmentExamples,
  vacationExamples,
} from "./examples";

describe("Search tests", () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  beforeEach(() => {
    departmentMock.mockReturnValueOnce(departmentExamples);
    vacationMock.mockReturnValueOnce(vacationExamples);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should list the departments in search results", async () => {
    workerMock.mockReturnValueOnce(workerExamples);
    const { body }: any = await server.executeOperation({
      query: searchQuery,
      variables: {
        searchTerm: "al",
      },
    });

    expect(body.singleResult?.data).toHaveProperty("search");
    expect(body.singleResult?.data.search).toHaveProperty(
      "departments",
      departmentExamples
    );
  });

  it("should list the workers in search results", async () => {
    workerMock.mockReturnValueOnce(workerExamples);
    const { body }: any = await server.executeOperation({
      query: searchQuery,
      variables: {
        searchTerm: "al",
      },
    });

    expect(body.singleResult?.data).toHaveProperty("search");
    expect(body.singleResult?.data.search).toHaveProperty(
      "workers",
      workerExamples
    );
  });

  it("should list the vacations from worker matched by search term", async () => {
    workerMock.mockReturnValueOnce([workerExamples[0]]);
    const { body }: any = await server.executeOperation({
      query: searchQuery,
      variables: {
        searchTerm: "Alf",
      },
    });

    expect(body.singleResult?.data).toHaveProperty("search");
    expect(body.singleResult?.data.search).toHaveProperty("vacations");
    expect(body.singleResult?.data.search.vacations).toEqual([
      vacationExamples[0],
      vacationExamples[1],
      vacationExamples[2],
    ]);
  });

  it("should list the vacations from worker matched by search term 2", async () => {
    workerMock.mockReturnValueOnce([workerExamples[1]]);
    const { body }: any = await server.executeOperation({
      query: searchQuery,
      variables: {
        searchTerm: "Ald",
      },
    });

    expect(body.singleResult?.data).toHaveProperty("search");
    expect(body.singleResult?.data.search).toHaveProperty("vacations");
    expect(body.singleResult?.data.search.vacations).toEqual([
      vacationExamples[3],
    ]);
  });
});
