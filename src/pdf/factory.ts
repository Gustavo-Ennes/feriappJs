import { translateVacationSubtype } from "./vacation/utils";
import { StandardFonts, TextAlignment, layoutMultilineText } from "pdf-lib";
import type { PDFDocument } from "pdf-lib";

import type {
  CreateSignParams,
  CreateParagraphParams,
  CreateTitleParams,
  Height,
  TableParams,
  DrawCellFnParams
} from "./types";
import { getMultiTextMeasures } from "./utils";
import { Number } from "mongoose";

const createHeader = async (document: PDFDocument): Promise<void> => {
  const header =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-header.png";
  const headerBuffer = await fetch(header).then((res) => res.arrayBuffer());
  const pngHeaderImage = await document.embedPng(headerBuffer);
  const pngHeaderDims = pngHeaderImage.scale(0.75);
  const page = document.getPage(0);

  page.drawImage(pngHeaderImage, {
    x: 20,
    y: page.getHeight() - 55,
    width: pngHeaderDims.width,
    height: pngHeaderDims.height,
    opacity: 1
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
    x: 30,
    y: page.getHeight() - 50,
    width: pngHeaderDims.width,
    height: pngHeaderDims.height,
    opacity: 1
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
    x: 20,
    y: 15,
    width: pngFooterDims.width,
    height: pngFooterDims.height,
    opacity: 1
  });
};

const createTitle = async ({
  title,
  document,
  height,
  size = 24,
  offset
}: CreateTitleParams): Promise<void> => {
  const font = await document.embedFont(StandardFonts.CourierBold);
  const textWidth = font.widthOfTextAtSize(title, size);
  const page = document.getPage(0);
  const { width } = page.getSize();
  const xCoordinate = width / 2 - textWidth / 2 - 15 + (offset ?? 0);

  // title
  page.drawText(title.toUpperCase(), {
    y: height.actual,
    x: xCoordinate,
    size
  });
};

const createParagraph = async ({
  document,
  text,
  height,
  fontSize = 14,
  x = 50,
  y = height.actual,
  lineHeight = 15,
  maxWidth,
  font
}: CreateParagraphParams): Promise<void> => {
  const page = document.getPage(0);
  const multiText = layoutMultilineText(text, {
    alignment: TextAlignment.Center,
    font,
    fontSize,
    bounds: {
      height: page.getHeight(),
      width: maxWidth ?? page.getWidth() - x * 2,
      x,
      y
    }
  });
  multiText.lines.forEach((line) => {
    page.drawText(line.text, {
      y,
      x,
      size: fontSize,
      maxWidth: maxWidth ?? page.getWidth() - x * 2,
      font,
      lineHeight,

    });
    y -= lineHeight;
  });
};

const createSign = async ({
  name,
  role,
  document,
  height,
  matriculation,
  x = 300
}: CreateSignParams): Promise<void> => {
  const page = document.getPage(0);
  const matriculationText = `Matr.: ${matriculation}`;

  page.drawLine({
    start: { x: x - 85, y: height.actual },
    end: { x: x + 85, y: height.actual }
  });
  height.stepLine();
  page.drawText(name, {
    y: height.actual,
    x: x - name.length * 3.2,
    size: 13
  });
  height.stepSmallLine();
  page.drawText(role, {
    y: height.actual,
    x: x - role.length * 2.5,
    size: 11
  });
  height.stepSmallLine();
  if (matriculation) {
    page.drawText(matriculationText, {
      y: height.actual,
      x: x - matriculationText.length * 2.3,
      size: 10
    });
    height.stepSmallLine();
  }
};

const createDaysQtd = async ({
  document,
  daysQtd,
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
    y: height.actual + 10,
    x: subtype ? page.getWidth() - 100 : page.getWidth() - 80,
    size: 11
  });
};

const drawTableLine = async ({
  height,
  document,
  page,
  line,
  font,
  startLineX,
  endLineX,
  lineHeight
}: DrawCellFnParams) => {
  const cellSize = (endLineX - startLineX) / line.length;
  const getCellFinalX = (index: number) => 35 + (index + 1) * cellSize;
  const getCellCenterX = (index: number, textWidth: number) =>
    getCellFinalX(index) - cellSize / 2 - textWidth / 2;
  const startHeight = height.actual;
  const fontSize = 11;
  let highestCellSize = 0;

  // cell upper line
  page.drawLine({
    start: { x: startLineX, y: height.actual },
    end: { x: endLineX, y: height.actual }
  });

  // goto middle to write
  height.actual -= lineHeight;

  line.forEach(async (cell, index) => {
    if(cell){
      const { width: paragraphWidth, height: paragraphHeight } =
      getMultiTextMeasures({
        text: cell,
        page,
        fontSize,
        x: startLineX,
        y: height.actual,
        lineHeight,
        maxWidth: cellSize * 0.8,
        font
      });
    const newX = getCellCenterX(index, paragraphWidth);

    if (paragraphHeight > highestCellSize) highestCellSize = paragraphHeight;

    await createParagraph({
      document,
      text: cell,
      height,
      fontSize,
      x: newX,
      lineHeight,
      maxWidth: cellSize * 0.8,
      font
    });
    }
  });

  height.actual -= highestCellSize;
  // each cell (except first) draws a vertical line in x1 point
  line.forEach((_, index) => {
    const newX = 35 + index * cellSize;
    if (index > 0)
      page.drawLine({
        start: { x: newX, y: height.actual },
        end: { x: newX, y: startHeight }
      });
  });
};

const createTable = async ({
  document,
  height,
  data,
  startLineX,
  endLineX,
  startY,
  page,
  font,
  lineHeight = 8
}: TableParams): Promise<void> => {
  for (let i = 0; i < data.length; i++) {
    await drawTableLine({
      height,
      document,
      page,
      line: data[i],
      font,
      startLineX,
      endLineX,
      lineHeight
    });
  }
  page.drawLine({
    start: { x: startLineX, y: height.actual },
    end: { x: endLineX, y: height.actual }
  });
  page.drawLine({
    start: { x: startLineX, y: startY },
    end: { x: startLineX, y: height.actual }
  });
  page.drawLine({
    start: { x: endLineX, y: startY },
    end: { x: endLineX, y: height.actual }
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
