import type { VacationInterface } from "../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../routes/Worker/types/worker";
import type { PDFDocument } from "pdf-lib";

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  instance: VacationInterface | WorkerInterface | null;
};

type CreatePdfParams = {
  name: string;
  pdfFn: (pdfFnParam: PdfFnParam) => Promise<void>;
  instance: VacationInterface | WorkerInterface;
};

type CreateTitleParams = {
  title: string;
  document: PDFDocument;
  height: Height;
  type?: string;
  size?: number;
};

type CreateParagraphParams = {
  text: string;
  document: PDFDocument;
  height: Height;
  fontSize?: number;
  x?: number;
  y?: number;
};

type CreateSignParams = {
  document: PDFDocument;
  height: Height;
  name: string;
  role: string;
  matriculation?: string;
  x?: number;
};

type DrawHalfPageParams = {
  height: Height;
  document: PDFDocument;
  vacation: VacationInterface;
};

export type {
  PdfFnParam,
  CreatePdfParams,
  CreateTitleParams,
  CreateParagraphParams,
  CreateSignParams,
  Height,
  DrawHalfPageParams,
};
