import { PDFDocument, PDFFont, PDFPage } from "pdf-lib";
import { Height } from "../types";
import { ExtraHourInterface } from "../../routes/ExtraHour/types/extraHour";

type DrawCellParams = {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  font: PDFFont;
};

type CreateReportTableParams = {
  extraHours: ExtraHourInterface[];
  document: PDFDocument;
  height: Height;
};

type GetMaxWidthArrayParams = {
  document: PDFDocument;
  parsedData: string[][];
};

type MakeLinesParams = {
  parsedData: string[][];
  maxWidths: number[];
  height: Height;
  document: PDFDocument;
  page: PDFPage;
};

export {
  DrawCellParams,
  CreateReportTableParams,
  GetMaxWidthArrayParams,
  MakeLinesParams,
};
