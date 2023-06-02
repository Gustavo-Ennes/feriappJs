import { DepartmentInterface } from "../routes/Department/types/department";
import { ExtraHourInterface } from "../routes/ExtraHour/types/extraHour";
import type { VacationInterface } from "../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../routes/Worker/types/worker";
import type { PDFDocument, PDFNumber, PDFPage } from "pdf-lib";

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  instance: VacationInterface | WorkerInterface | DepartmentInterface | null;
  reference?: Date;
  justification?: string;
  extraHours?: ExtraHourInterface[]
};

type DrawCellFnParams = {
  height: Height;
  document: PDFDocument;
  text: string;
  page: PDFPage;
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
  size?: number;
  offset?: number
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

type TableParams = {
  data: string[];
  document: PDFDocument;
  height: Height;
  page: PDFPage;
  startLineX: number;
  endLineX: number;
  startY: number;
};

export type {
  PdfFnParam,
  CreatePdfParams,
  CreateTitleParams,
  CreateParagraphParams,
  CreateSignParams,
  Height,
  DrawHalfPageParams,
  TableParams,
  DrawCellFnParams,
};
