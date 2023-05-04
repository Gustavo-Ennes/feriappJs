import type { PDFDocument } from "pdf-lib";

import type { WorkerInterface } from "../../routes/Worker/types/worker";
import type { Height } from "../types";

type JustificationPdfFnParam = {
  document: PDFDocument;
  worker: WorkerInterface;
};

interface DrawJustificationBlockParams extends JustificationPdfFnParam {
  height: Height;
}

export type { JustificationPdfFnParam, DrawJustificationBlockParams };
