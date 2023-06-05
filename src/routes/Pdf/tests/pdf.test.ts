import {
  describe,
  it,
  expect,
  afterEach,
  vi,
  beforeAll,
  expectTypeOf,
} from "vitest";
import { parse } from "date-fns";
import { dissoc } from "ramda";

import { vacationMock } from "../../../utils/mockApplication";
import { server } from "../../../../app";
import {
  authorizationPdfQuery,
  justificationPdfQuery,
  reportPdfPdfQuery,
  vacationPdfQuery,
} from "./queries";
import { vacationFixture, workerFixture } from "./fixtures";

describe("Pdf route tests", async () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get a vacationPdf", async () => {
    vacationMock.mockResolvedValueOnce(vacationFixture);
    const pdfInput = { vacationId: "1" };
    const { body }: any = await server.executeOperation({
      query: vacationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.have.property("vacationPdf");
    expectTypeOf(body.singleResult?.data?.vacationPdf).toBeString;
  });

  it("should return null when no Id is given in vacationPdf", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = { vacationId: undefined };
    const { body }: any = await server.executeOperation({
      query: vacationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a justificationPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = { workerId: "1" };
    const { body }: any = await server.executeOperation({
      query: justificationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.have.property("justificationPdf");
    expectTypeOf(body.singleResult?.data?.justificationPdfQuery).toBeString;
  });

  it("should return null when no workerID is given in justificationPfd", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = { workerId: undefined };
    const { body }: any = await server.executeOperation({
      query: justificationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a authorizationPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = {
      workerId: "1",
      reference: new Date(),
      justification: "Work",
    };
    const { body }: any = await server.executeOperation({
      query: authorizationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.have.property("authorizationPdf");
    expectTypeOf(body.singleResult?.data?.authorizationPdf).toBeString;
  });

  it("should return null when no workerId is given in justificationPfd", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = {
      workerId: undefined,
      reference: new Date(),
      justifiacation: "",
    };
    const { body }: any = await server.executeOperation({
      query: authorizationPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a reportPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = { departmentId: "1", reference: new Date() };
    const { body }: any = await server.executeOperation({
      query: reportPdfPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.have.property("reportPdf");
    expectTypeOf(body.singleResult?.data?.reportPdf).toBeString;
  });


  it("should return null when no departoemtnId is given in reportPdf", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = {
      departmentId: undefined,
      reference: new Date(),
    };
    const { body }: any = await server.executeOperation({
      query: reportPdfPdfQuery,
      variables: pdfInput,
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });
});
