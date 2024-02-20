import {
  PDFDocument,
  StandardFonts,
  TextAlignment,
  layoutMultilineText
} from "pdf-lib";

import type {
  CreateParagraphParams,
  CreateSignParams,
  CreateTitleParams,
  DrawCellFnParams,
  Height,
  TableParams
} from "./types";

import { getTableInfo } from "./table";
import { calculateCellRealWidth, getMultiTextMeasures } from "./utils";
import { translateVacationSubtype } from "./vacation/utils";

const createHeader = async (
  document: PDFDocument,
  y?: number
): Promise<void> => {
  const header =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-header.png";
  const headerBuffer = await fetch(header).then((res) => res.arrayBuffer());
  const pngHeaderImage = await document.embedPng(headerBuffer);
  const pngHeaderDims = pngHeaderImage.scale(0.75);
  const page = document.getPage(0);

  page.drawImage(pngHeaderImage, {
    height: pngHeaderDims.height,
    opacity: 1,
    width: pngHeaderDims.width,
    x: 20,
    y: y ?? page.getHeight() - 55
  });
};

const createPageHeaderHorizontal = async (
  document: PDFDocument
): Promise<void> => {
  const header =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-header.png";
  const headerBuffer = await fetch(header).then((res) => res.arrayBuffer());
  const pngHeaderImage = await document.embedPng(headerBuffer);
  const pngHeaderDims = pngHeaderImage.scale(0.65);
  const page = document.getPage(0);

  page.drawImage(pngHeaderImage, {
    height: pngHeaderDims.height,
    opacity: 1,
    width: pngHeaderDims.width,
    x: 30,
    y: page.getHeight() - 50
  });
};

const createFooter = async (document: PDFDocument): Promise<void> => {
  const footer =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-footer.png";
  const footerBuffer = await fetch(footer).then((res) => res.arrayBuffer());
  const pngFooterImage = await document.embedPng(footerBuffer);
  const pngFooterDims = pngFooterImage.scale(0.75);
  const page = document.getPage(0);

  page.drawImage(pngFooterImage, {
    height: pngFooterDims.height,
    opacity: 1,
    width: pngFooterDims.width,
    x: 20,
    y: 15
  });
};

const createTitle = async ({
  document,
  height,
  offset,
  size = 24,
  title
}: CreateTitleParams): Promise<void> => {
  const font = await document.embedFont(StandardFonts.HelveticaBold);
  const textWidth = font.widthOfTextAtSize(title, size);
  const page = document.getPage(0);
  const { width } = page.getSize();
  const xCoordinate = width / 2 - textWidth / 2 - 15 + (offset ?? 0);

  // title
  page.drawText(title.toUpperCase(), {
    size,
    x: xCoordinate,
    y: height.actual
  });
};

const createParagraph = async ({
  document,
  font,
  fontSize = 14,
  height,
  lineHeight = 15,
  maxWidth,
  text,
  x = 50,
  y = height.actual
}: CreateParagraphParams): Promise<void> => {
  const page = document.getPage(0);
  const multiText = layoutMultilineText(text, {
    alignment: TextAlignment.Center,
    bounds: {
      height: page.getHeight(),
      width: maxWidth ?? page.getWidth() - x * 2,
      x,
      y
    },
    font,
    fontSize
  });
  multiText.lines.forEach((line) => {
    page.drawText(line.text, {
      font,
      lineHeight,
      maxWidth: maxWidth ?? page.getWidth() - x * 2,
      size: fontSize,
      x,
      y
    });
    y -= lineHeight;
  });
};

const createSign = async ({
  document,
  height,
  matriculation,
  name,
  role,
  x = 300
}: CreateSignParams): Promise<void> => {
  const page = document.getPage(0);
  const matriculationText = `Matr.: ${matriculation}`;
  const regularFont = await document.embedFont(StandardFonts.Helvetica);
  const boldFont = await document.embedFont(StandardFonts.HelveticaBold);
  const regularFontSize = 12;
  const boldFontSize = regularFontSize * 1.1;
  const textLines = ["_______________________", name, role];
  const maxWidth = page.getWidth();
  const lineHeight = 15;
  const NAME_TEXT_LINE_INDEX = 1;
  let y = height.actual;

  if (matriculation) textLines.push(matriculationText);

  textLines.forEach((line, index) => {
    const font = index === NAME_TEXT_LINE_INDEX ? boldFont : regularFont;
    const fontSize =
      index === NAME_TEXT_LINE_INDEX ? boldFontSize : regularFontSize;
    const textWidth = font.widthOfTextAtSize(line, fontSize);

    page.drawText(line, {
      font,
      lineHeight,
      maxWidth,
      size: fontSize,
      x: x - textWidth / 2,
      y
    });
    y -= lineHeight;
  });

};

const createDaysQtd = async ({
  daysQtd,
  document,
  height,
  subtype
}: {
  document: PDFDocument;
  daysQtd: number;
  height: Height;
  subtype?: string;
}): Promise<void> => {
  const page = document.getPage(0);
  const text = subtype
    ? `${translateVacationSubtype(subtype)}`
    : `${daysQtd} dias`;
  page.drawText(text, {
    size: 11,
    x: subtype ? page.getWidth() - 100 : page.getWidth() - 80,
    y: height.actual + 10
  });
};

const drawTableLine = async ({
  columnsXArray,
  document,
  endLineX,
  font,
  height,
  line,
  lineHeight,
  page,
  startLineX
}: DrawCellFnParams) => {
  const defaultCellWidth = (endLineX - startLineX) / line.length;
  const getCellCenterX = (
    textWidth: number,
    cellEndX: number,
    cellWidth?: number
  ) => cellEndX - (cellWidth ?? defaultCellWidth) / 2 - textWidth / 2;
  const startHeight = height.actual;
  const fontSize = 11;
  let highestCellSize = 0;

  // cell upper line
  page.drawLine({
    end: { x: endLineX, y: height.actual },
    start: { x: startLineX, y: height.actual }
  });

  // goto middle to write
  height.actual -= lineHeight;

  line.forEach(async (cell, index) => {
    if (cell) {
      const cellRealWidth = calculateCellRealWidth(
        columnsXArray,
        index,
        startLineX
      );
      const { height: paragraphHeight, width: paragraphWidth } =
        getMultiTextMeasures({
          font,
          fontSize,
          lineHeight,
          maxWidth: cellRealWidth * 0.8,
          page,
          text: cell,
          x: startLineX,
          y: height.actual
        });
      const newX = getCellCenterX(
        paragraphWidth,
        columnsXArray[index],
        cellRealWidth
      );

      if (paragraphHeight > highestCellSize) highestCellSize = paragraphHeight;
      await createParagraph({
        document,
        font,
        fontSize,
        height,
        lineHeight,
        maxWidth: cellRealWidth * 0.8,
        text: cell,
        x: newX
      });
    }
  });

  height.actual -= highestCellSize;
  // each cell (except first) draws a vertical line in x1 point
  line.forEach((_, index) => {
    const x = columnsXArray[index];
    if (index >= 0)
      page.drawLine({
        end: { x, y: startHeight },
        start: { x, y: height.actual }
      });
  });
};

const createTable = async ({
  data,
  document,
  endLineX,
  font,
  fontSize,
  height,
  lineHeight = 8,
  page,
  startLineX,
  startY
}: TableParams): Promise<void> => {
  const maxColumnWidth = (endLineX - startLineX) / data[0].length;
  const { columnsXArray } = getTableInfo({
    data,
    font,
    fontSize,
    lineHeight,
    maxColumnWidth,
    maxWidth: page.getWidth() - 70,
    page,
    startX: startLineX,
    x: 35,
    y: height.actual
  });

  for (let i = 0; i < data.length; i++) {
    await drawTableLine({
      columnsXArray,
      data,
      document,
      endLineX,
      font,
      height,
      line: data[i],
      lineHeight,
      page,
      startLineX
    });
  }
  page.drawLine({
    end: { x: endLineX, y: height.actual },
    start: { x: startLineX, y: height.actual }
  });
  page.drawLine({
    end: { x: startLineX, y: height.actual },
    start: { x: startLineX, y: startY }
  });
  page.drawLine({
    end: { x: endLineX, y: height.actual },
    start: { x: endLineX, y: startY }
  });
};

export {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  createSign,
  createDaysQtd,
  createTable,
  createPageHeaderHorizontal
};
