import { PageSizes, StandardFonts } from "pdf-lib";

import { PdfFnParam } from "../types";
import { getHeightObject } from "../utils";
import {
  createPageHeaderHorizontal,
  createTitle,
  createParagraph,
  createTable
} from "../factory";
import { fuelingTableData, vehicleUsageTableData } from "./data";

const render = async ({ document }: PdfFnParam): Promise<void> => {
  if (document) {
    const page = document.addPage([PageSizes.A4[1], PageSizes.A4[0]]);
    const height = getHeightObject(page);
    const font = await document.embedFont(StandardFonts.Helvetica);
    height.actual += 40;
    await createPageHeaderHorizontal(document);
    await createTitle({
      title: "Boletim de utilização de veículo",
      document,
      height,
      size: 15,
      offset: 250
    });

    height.stepHugeLine();

    const paragraphText =
      "PLACA:______________ PREFIXO:______________ MÊS:______________ ANO:______________";
    const paragraphWidth = font.widthOfTextAtSize(paragraphText, 15);
    await createParagraph({
      document,
      text: paragraphText,
      height,
      fontSize: 15,
      x: (page.getWidth() - 35) / 2 - paragraphWidth / 2 - 5,
      font
    });

    height.stepLine();

    await createTable({
      document,
      height,
      startLineX: 35,
      endLineX: page.getWidth() - 35,
      startY: height.actual,
      data: vehicleUsageTableData,
      page,
      font,
      lineHeight: 16
    });
    height.stepLine();

    const fuelingText = "ABASTECIMENTO";
    const fuelingTextWidth = font.widthOfTextAtSize(fuelingText, 15);
    const fuelingTextX = (page.getWidth() - 35) / 2 - fuelingTextWidth / 4;
    page.drawText("ABASTECIMENTO", {
      font,
      x: fuelingTextX,
      size: 15,
      y: height.actual
    });

    height.stepSmallLine();

    await createTable({
      document,
      height,
      startLineX: 35,
      endLineX: page.getWidth() - 35,
      startY: height.actual,
      data: fuelingTableData,
      page,
      font,
      lineHeight: 12
    });

    height.stepSmallLine();

    await createTable({
      document,
      height,
      startLineX: 35,
      endLineX: page.getWidth() - 35,
      startY: height.actual,
      data: fuelingTableData,
      page,
      font,
      lineHeight: 12
    });
  }
};

export { render };
