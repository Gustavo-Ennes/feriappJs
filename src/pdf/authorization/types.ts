import type { PDFDocument } from "pdf-lib";

import type { WorkerInterface } from "../../routes/Worker/types/worker";

type JustificationPdfFnParam = {
  document: PDFDocument;
  worker: WorkerInterface;
  reference: Date;
};

type CreateTableDataParams = {
  worker: WorkerInterface;
  reference: Date;
};

type calculateExtraHoursParams = {
  worker: WorkerInterface;
  reference: Date;
};

export type {
  JustificationPdfFnParam,
  CreateTableDataParams,
  calculateExtraHoursParams
};
