import { sum, pluck, uniq } from "ramda";
import { format } from "date-fns";

import { ExtraHourInterface } from "../../routes/ExtraHour/types/extraHour";
import { WorkerInterface } from "../../routes/Worker/types/worker";
import { capitalizeName } from "../../utils/capitalize";
import { StandardFonts } from "pdf-lib";
import {
  CreateReportTableParams,
  DrawCellParams,
  GetMaxWidthArrayParams,
  MakeLinesParams,
  ParseDataFnParams,
} from "./types";

const calculateDepartmentTotal = (extraHours: ExtraHourInterface[]) =>
  sum(pluck("amount", extraHours));

const calculateWorkerTotal = (
  worker: WorkerInterface,
  extraHours: ExtraHourInterface[]
): number => {
  const workerExtraHours: ExtraHourInterface[] = extraHours.filter(
    ({ worker: extraHourWorker }: ExtraHourInterface) =>
      extraHourWorker._id === worker._id
  );
  return sum(pluck("amount", workerExtraHours));
};

const calculateTotalNightlyHours = (extraHours: ExtraHourInterface[]): number =>
  sum(pluck("nightlyAmount", extraHours));

const calculateWorkerTotalNightlyHours = (
  worker: WorkerInterface,
  extraHours: ExtraHourInterface[]
): number => {
  const workerExtraHours: ExtraHourInterface[] = extraHours.filter(
    ({ worker: extraHourWorker }: ExtraHourInterface) =>
      extraHourWorker._id === worker._id
  );
  return sum(pluck("nightlyAmount", workerExtraHours));
};

const parseData = ({
  extraHours,
  total,
  nightlyTotal,
}: ParseDataFnParams): string[][] => {
  const workers: WorkerInterface[] = uniq(pluck("worker", extraHours));
  const data: string[][] = [];
  const columns = [
    "NOME",
    "REGISTRO",
    "MATRÍCULA",
    "H. EXTRAS",
    "A. NOTURNO",
    "FALTAS",
  ];
  data.push(columns);
  workers.map((worker) => {
    const workerTotal = calculateWorkerTotal(worker, extraHours);
    const workerNightlyTotal = calculateWorkerTotalNightlyHours(
      worker,
      extraHours
    );
    if (workerTotal > 0) {
      data.push([
        capitalizeName(worker.name),
        worker.registry,
        worker.matriculation,
        workerTotal.toFixed(1),
        workerNightlyTotal.toFixed(1),
        "0",
      ]);
    }
  });
  data.push(["TOTAL", "", "", total.toFixed(1), nightlyTotal.toFixed(1), "0"]);
  return data;
};

const drawCell = async ({
  page,
  text,
  x,
  y,
  height,
  width,
  font,
}: DrawCellParams) => {
  const padding = 10;
  const startLineX = x;
  const endLineX = x + width;
  const startLineY = y;
  const endLineY = y - height;
  // top line
  page.drawLine({
    start: { x: startLineX, y: startLineY },
    end: { x: endLineX, y: startLineY },
  });
  const textX = x + (width / 2 - font.widthOfTextAtSize(text, 10) / 2);

  page.drawText(text, {
    y: y - 1.5 * padding,
    x: textX,
    size: 10,
    maxWidth: width,
    font,
    lineHeight: 15,
  });

  // bottom line
  page.drawLine({
    start: { x: startLineX, y: endLineY },
    end: { x: endLineX, y: endLineY },
  });
  // right line
  page.drawLine({
    start: { x: startLineX, y: startLineY },
    end: { x: startLineX, y: endLineY },
  });
  // left line
  page.drawLine({
    start: { x: endLineX, y: startLineY },
    end: { x: endLineX, y: endLineY },
  });
};

const getMaxWidthArray = async ({
  parsedData,
  document,
}: GetMaxWidthArrayParams): Promise<number[]> => {
  const maxWidths: number[] = [];
  const paddings = 20;
  const font = await document.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < 6; i++) {
    let maxWidth = 0;
    for (let j = 0; j < parsedData.length; j++) {
      const textWidth: number = font.widthOfTextAtSize(parsedData[j][i], 10);
      if (textWidth > maxWidth) {
        maxWidth = textWidth;
      }
    }
    maxWidths.push(maxWidth + paddings);
  }
  return maxWidths;
};

const makeLines = async ({
  parsedData,
  maxWidths,
  height,
  document,
  page,
}: MakeLinesParams): Promise<void> => {
  const tableWidth = sum(maxWidths);
  const actualWidthValue = page.getWidth() / 2 - tableWidth / 2;
  const widthObject = {
    actual: actualWidthValue,
    step(number: number) {
      this.actual += number;
    },
  };

  for (let h = 0; h < parsedData.length; h++) {
    const oldHeight = height.actual;
    const font = await document.embedFont(
      h === 0 || h === parsedData.length - 1
        ? StandardFonts.HelveticaBold
        : StandardFonts.Helvetica
    );
    const fontHeight = font.heightAtSize(11);
    for (let i = 0; i < maxWidths.length; i++) {
      await drawCell({
        page,
        text: parsedData[h][i],
        x: widthObject.actual,
        y: height.actual,
        height: fontHeight * 2,
        width: maxWidths[i],
        font,
      });
      widthObject.step(maxWidths[i]);
      height.actual = oldHeight;
    }
    height.actual -= fontHeight * 2;
    widthObject.actual = actualWidthValue;
  }
};

const createReportTable = async ({
  extraHours,
  document,
  height,
}: CreateReportTableParams) => {
  const page = document.getPage(0);
  const total = calculateDepartmentTotal(extraHours);
  const nightlyTotal = calculateTotalNightlyHours(extraHours);
  const parsedData = parseData({ extraHours, total, nightlyTotal });
  const maxWidths = await getMaxWidthArray({ parsedData, document });

  await makeLines({
    parsedData,
    maxWidths,
    height,
    document,
    page,
  });
};

const monthString = (reference: Date): string => {
  const months: Record<string, string> = {
    January: "Janeiro",
    February: "Fevereiro",
    March: "Março",
    April: "Abril",
    May: "Maio",
    June: "Junho",
    July: "Julho",
    August: "Agosto",
    September: "Setembro",
    October: "Outubro",
    November: "Novembro",
    December: "Dezembro",
  };
  const englishMonth = format(reference, "LLLL");

  return `${months[englishMonth].toUpperCase()} DE ${reference.getFullYear()}`;
};

export { createReportTable, monthString };
