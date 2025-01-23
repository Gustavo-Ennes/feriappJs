/* eslint-disable no-unused-vars */
import type { PDFDocument, PDFFont, PDFPage } from "pdf-lib";

import type { VacationInterface } from "../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../routes/Worker/types/worker";

import { DepartmentInterface } from "../routes/Department/types/department";
import { ExtraHourInterface } from "../routes/ExtraHour/types/extraHour";

type LineData = (string | undefined)[];
type TableData = LineData[];

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepLines: (lineQtd: number, type?: string) => void;
  stepSmallLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  instance?: VacationInterface | WorkerInterface | DepartmentInterface | null;
  instances?:
    | VacationInterface[]
    | WorkerInterface[]
    | DepartmentInterface[]
    | null;
  reference?: Date;
  extraHours?: ExtraHourInterface[];
  type?: string; // print type
  period?: string;
};

type DrawCellFnParams = {
  columnsXArray: number[];
  height: Height;
  document: PDFDocument;
  line: LineData;
  page: PDFPage;
  font: PDFFont;
  startLineX: number;
  endLineX: number;
  lineHeight: number;
  data: TableData;
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
  data: TableData;
  document: PDFDocument;
  height: Height;
  page: PDFPage;
  startLineX: number;
  endLineX: number;
  startY: number;
  font: PDFFont;
  lineHeight?: number;
  fontSize: number;
};

type GetMultiTextWidthParam = {
  startX?: number;
  maxColumnWidth?: number;
  data?: TableData;
  text?: string;
  page: PDFPage;
  font: PDFFont;
  lineHeight: number;
  maxWidth: number;
  x: number;
  y: number;
  fontSize: number;
};

type GetTableInfoParam = {
  data: TableData;
  x: number;
  y: number;
};

type MaterialRequisitionDrawBlockParam = {
  document: PDFDocument;
  height: Height;
  font: PDFFont;
  fontSize: number;
  page: PDFPage;
  headerY?: number;
};

export type {
  CreateParagraphParams,
  CreatePdfParams,
  CreateSignParams,
  CreateTitleParams,
  DrawCellFnParams,
  DrawHalfPageParams,
  GetMultiTextWidthParam,
  GetTableInfoParam,
  Height,
  LineData,
  MaterialRequisitionDrawBlockParam,
  PdfFnParam,
  TableData,
  TableParams
};
