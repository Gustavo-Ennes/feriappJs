import type { PdfFnParam } from "../types";
import {
  createHeader,
  createFooter,
  createTitle,
  createTable,
  createParagraph,
  createSign,
} from "../factory";
import type { WorkerInterface } from "../../routes/Worker/types/worker";
import { getHeightObject } from "../utils";
import { createTableData } from "./utils";
import { StandardFonts } from "pdf-lib";
import { capitalizeName } from "../../utils/capitalize";

const render = async ({
  document,
  instance,
  reference,
}: PdfFnParam): Promise<void> => {
  const worker = instance as WorkerInterface;
  if (document && reference && worker) {
    const tableData = await createTableData({
      worker,
      reference,
    });
    const page = document.addPage();
    const height = getHeightObject(page);
    const startLineX: number = 50;
    const endLineX: number = page.getWidth() - 50;
    const font = await document.embedFont(StandardFonts.Helvetica);

    await createHeader(document);
    await createFooter(document);
    await createTitle({
      document,
      height,
      title: "autorização para realização de horas extras",
      size: 18,
    });
    height.stepHugeLine();

    const startY: number = height.actual;
    await createTable({
      document,
      height,
      data: tableData,
      startLineX,
      endLineX,
      startY,
      page,
    });
    height.stepHugeLine();
    height.stepHugeLine();

    await createSign({
      name: capitalizeName(worker.name),
      role: "ciente do servidor",
      document,
      height,
    });
    height.stepHugeLine();
    height.stepHugeLine();

    page.drawLine({
      start: { x: startLineX, y: height.actual },
      end: { x: endLineX, y: height.actual },
    });
    height.stepHugeLine();

    const authorizationText =
      "AUTORIZAÇÃO PARA PAGAMENTO DAS HORAS EXTRAS EXECUTADAS";
    await createTitle({
      title: authorizationText,
      document,
      height,
      size: 14,
    });

    const textWidth = font.widthOfTextAtSize(authorizationText, 14);
    page.drawLine({
      //underline
      start: {
        x: page.getWidth() / 2 - textWidth / 2 - 5,
        y: height.actual - 2,
      },
      end: {
        x: page.getWidth() / 2 - textWidth / 2 + 5 + textWidth,
        y: height.actual - 2,
      },
      thickness: 1,
    });
    height.stepHugeLine();
    const paragraphText = `
    Pela presente, autorizo o setor de recursos humanos a efetuar o pagamento das horas extras, referentes ao período autorizado, conforme o relatório de cartão de ponto que deverá ser anexado a presente autorização.
    `;
    await createParagraph({
      document,
      text: paragraphText,
      height,
      fontSize: 13,
    });
    height.stepHugeLine();
    height.stepHugeLine();
    height.stepHugeLine();
    await createSign({
      name: "Sebastião Arosti",
      role: "Diretor do Departamento de Transporte",
      document,
      height,
    });
  }
};

export { render };
