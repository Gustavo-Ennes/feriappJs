/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  afterEach,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
  vi
} from "vitest";

import { vacationMock } from "../../../utils/mockApplication";
import { vacationFixture, workerFixture } from "./fixtures";
import {
  authorizationPdfQuery,
  justificationPdfQuery,
  reportPdfPdfQuery,
  vacationPdfQuery
} from "./queries";

describe("Pdf route tests", async () => {
  const { server } = await import("../../../../app");

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
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.have.property("vacationPdf");
    expectTypeOf(body.singleResult?.data?.vacationPdf).toBeString;
  });

  it("should return null when no Id is given in vacationPdf", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = { vacationId: undefined };
    const { body }: any = await server.executeOperation({
      query: vacationPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a justificationPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = { workerId: "1" };
    const { body }: any = await server.executeOperation({
      query: justificationPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.have.property("justificationPdf");
    expectTypeOf(body.singleResult?.data?.justificationPdfQuery).toBeString;
  });

  it("should return null when no workerID is given in justificationPfd", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = { workerId: undefined };
    const { body }: any = await server.executeOperation({
      query: justificationPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a authorizationPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = {
      reference: new Date(),
      workerId: "1"
    };
    const { body }: any = await server.executeOperation({
      query: authorizationPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.have.property("authorizationPdf");
    expectTypeOf(body.singleResult?.data?.authorizationPdf).toBeString;
  });

  it("should return null when no workerId is given in justificationPfd", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = {
      reference: new Date(),
      workerId: undefined
    };
    const { body }: any = await server.executeOperation({
      query: authorizationPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });

  it("should get a reportPdf", async () => {
    vacationMock.mockResolvedValueOnce(workerFixture);
    const pdfInput = { departmentId: "1", reference: new Date() };
    const { body }: any = await server.executeOperation({
      query: reportPdfPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.have.property("reportPdf");
    expectTypeOf(body.singleResult?.data?.reportPdf).toBeString;
  });

  it("should return null when no departoemtnId is given in reportPdf", async () => {
    vacationMock.mockResolvedValueOnce(null);
    const pdfInput = {
      departmentId: undefined,
      reference: new Date()
    };
    const { body }: any = await server.executeOperation({
      query: reportPdfPdfQuery,
      variables: pdfInput
    });
    expect(body.singleResult?.data).to.be.undefined;
    expect(body.singleResult?.errors).to.not.be.empty;
  });
});
