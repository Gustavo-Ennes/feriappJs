import { DepartmentInterface } from "../routes/Department/types/department";
import { ExtraHourInterface } from "../routes/ExtraHour/types/extraHour";
import type { VacationInterface } from "../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../routes/Worker/types/worker";
import type { PDFDocument, PDFFont, PDFPage } from "pdf-lib";

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  instance?: VacationInterface | WorkerInterface | DepartmentInterface | null;
  reference?: Date;
  extraHours?: ExtraHourInterface[];
};

type DrawCellFnParams = {
  height: Height;
  document: PDFDocument;
  line: (string | undefined)[];
  page: PDFPage;
  font: PDFFont;
  startLineX: number;
  endLineX: number;
  lineHeight: number;
};

type CreatePdfParams = {
  name: string;
  // eslint-disable-next-line no-unused-vars
  pdfFn: (pdfFnParam: PdfFnParam) => Promise<void>;
  instance: VacationInterface | WorkerInterface;
};

type CreateTitleParams = {
  title: string;
  document: PDFDocument;
  height: Height;
  size?: number;
  offset?: number;
};

type CreateParagraphParams = {
  text: string;
  document: PDFDocument;
  height: Height;
  fontSize?: number;
  font: PDFFont;
  x?: number;
  y?: number;
  lineHeight?: number;
  maxWidth?: number;
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
  data: (string | undefined)[][];
  document: PDFDocument;
  height: Height;
  page: PDFPage;
  startLineX: number;
  endLineX: number;
  startY: number;
  font: PDFFont;
  lineHeight?: number;
};

type GetMultiTextWidthParam = {
  text: string;
  page: PDFPage;
  font: PDFFont;
  lineHeight: number;
  maxWidth: number;
  x: number;
  y: number;
  fontSize: number;
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
  GetMultiTextWidthParam
};
