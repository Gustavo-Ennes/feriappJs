import { translateVacationSubtype } from "./vacation/utils";
import { StandardFonts } from "pdf-lib";
import type { PDFDocument } from "pdf-lib";

import type {
  CreateSignParams,
  CreateParagraphParams,
  CreateTitleParams,
  Height,
  TableParams,
  DrawCellFnParams,
} from "./types";

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
    opacity: 1,
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
    opacity: 1,
  });
};

const createTitle = async ({
  title,
  document,
  height,
  size = 24,
  offset,
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
    size,
  });
};

const createParagraph = async ({
  document,
  text,
  height,
  fontSize = 14,
  x = 50,
  y = height.actual,
}: CreateParagraphParams): Promise<void> => {
  const page = document.getPage(0);
  const font = await document.embedFont(StandardFonts.Helvetica);
  page.drawText(text, {
    y,
    x,
    size: fontSize,
    maxWidth: page.getWidth() - 100,
    font,
    lineHeight: 15,
  });
};

const createSign = async ({
  name,
  role,
  document,
  height,
  matriculation,
  x = 300,
}: CreateSignParams): Promise<void> => {
  const page = document.getPage(0);
  const matriculationText = `Matr.: ${matriculation}`;

  page.drawLine({
    start: { x: x - 85, y: height.actual },
    end: { x: x + 85, y: height.actual },
  });
  height.stepLine();
  page.drawText(name, {
    y: height.actual,
    x: x - name.length * 3.2,
    size: 13,
  });
  height.stepSmallLine();
  page.drawText(role, {
    y: height.actual,
    x: x - role.length * 2.5,
    size: 11,
  });
  height.stepSmallLine();
  if (matriculation) {
    page.drawText(matriculationText, {
      y: height.actual,
      x: x - matriculationText.length * 2.3,
      size: 10,
    });
    height.stepSmallLine();
  }
};

const createDaysQtd = async ({
  document,
  daysQtd,
  height,
  subtype,
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
    size: 11,
  });
};

const drawCell = async ({ height, document, page, text }: DrawCellFnParams) => {
  const startLineX = 50;
  const endLineX = page.getWidth() - 50;
  const size = text.split("\n").length;
  page.drawLine({
    start: { x: startLineX, y: height.actual },
    end: { x: endLineX, y: height.actual },
  });
  height.stepLine();
  await createParagraph({
    document,
    text,
    height,
    fontSize: 12,
    x: 55,
  });
  for (let i = 0; i < size; i++) {
    height.actual -= 15;
  }
};

const createTable = async ({
  document,
  height,
  data,
  startLineX,
  endLineX,
  startY,
  page,
}: TableParams): Promise<void> => {
  for (let i = 0; i < data.length; i++) {
    await drawCell({ height, document, page, text: data[i] });
    page.drawLine({
      start: { x: startLineX, y: height.actual },
      end: { x: endLineX, y: height.actual },
    });
    page.drawLine({
      start: { x: startLineX, y: startY },
      end: { x: startLineX, y: height.actual },
    });
    page.drawLine({
      start: { x: endLineX, y: startY },
      end: { x: endLineX, y: height.actual },
    });
  }
};

export {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  createSign,
  createDaysQtd,
  createTable,
};
