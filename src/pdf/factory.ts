import { translateVacationSubtype } from "./vacation/utils";
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
import { getMultiTextMeasures } from "./utils";

const createHeader = async (document: PDFDocument): Promise<void> => {
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
    y: page.getHeight() - 55
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
  const font = await document.embedFont(StandardFonts.CourierBold);
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

  page.drawLine({
    end: { x: x + 85, y: height.actual },
    start: { x: x - 85, y: height.actual }
  });
  height.stepLine();
  page.drawText(name, {
    size: 13,
    x: x - name.length * 3.2,
    y: height.actual
  });
  height.stepSmallLine();
  page.drawText(role, {
    size: 11,
    x: x - role.length * 2.5,
    y: height.actual
  });
  height.stepSmallLine();
  if (matriculation) {
    page.drawText(matriculationText, {
      size: 10,
      x: x - matriculationText.length * 2.3,
      y: height.actual
    });
    height.stepSmallLine();
  }
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
  document,
  endLineX,
  font,
  height,
  line,
  lineHeight,
  page,
  startLineX
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
    end: { x: endLineX, y: height.actual },
    start: { x: startLineX, y: height.actual }
  });

  // goto middle to write
  height.actual -= lineHeight;

  line.forEach(async (cell, index) => {
    if (cell) {
      const { height: paragraphHeight, width: paragraphWidth } =
        getMultiTextMeasures({
          font,
          fontSize,
          lineHeight,
          maxWidth: cellSize * 0.8,
          page,
          text: cell,
          x: startLineX,
          y: height.actual
        });
      const newX = getCellCenterX(index, paragraphWidth);

      if (paragraphHeight > highestCellSize) highestCellSize = paragraphHeight;

      await createParagraph({
        document,
        font,
        fontSize,
        height,
        lineHeight,
        maxWidth: cellSize * 0.8,
        text: cell,
        x: newX
      });
    }
  });

  height.actual -= highestCellSize;
  // each cell (except first) draws a vertical line in x1 point
  line.forEach((_, index) => {
    const newX = 35 + index * cellSize;
    if (index > 0)
      page.drawLine({
        end: { x: newX, y: startHeight },
        start: { x: newX, y: height.actual }
      });
  });
};

const createTable = async ({
  data,
  document,
  endLineX,
  font,
  height,
  lineHeight = 8,
  page,
  startLineX,
  startY
}: TableParams): Promise<void> => {
  for (let i = 0; i < data.length; i++) {
    await drawTableLine({
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
