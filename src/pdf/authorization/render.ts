import type { PdfFnParam } from "../types";
import {
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTable,
  createTitle
} from "../factory";
import type { WorkerInterface } from "../../routes/Worker/types/worker";
import { getHeightObject } from "../utils";
import { StandardFonts } from "pdf-lib";
import { capitalizeName } from "../../utils/capitalize";
import { getAuthorizationPdfData } from "./data";

const render = async ({
  document,
  instance,
  reference
}: PdfFnParam): Promise<void> => {
  const worker = instance as WorkerInterface;
  if (document && reference && worker) {
    const tableData = await getAuthorizationPdfData(worker, reference);
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
      size: 18,
      title: "autorização para realização de horas extras"
    });
    height.stepHugeLine();

    const startY: number = height.actual;
    await createTable({
      data: tableData,
      document,
      endLineX,
      font,
      height,
      lineHeight: 16,
      page,
      startLineX,
      startY
    });
    height.stepHugeLine();
    height.stepHugeLine();

    await createSign({
      document,
      height,
      name: capitalizeName(worker.name),
      role: "ciente do servidor"
    });
    height.stepHugeLine();
    height.stepHugeLine();

    page.drawLine({
      end: { x: endLineX, y: height.actual },
      start: { x: startLineX, y: height.actual }
    });
    height.stepHugeLine();

    const authorizationText =
      "AUTORIZAÇÃO PARA PAGAMENTO DAS HORAS EXTRAS EXECUTADAS";
    await createTitle({
      document,
      height,
      size: 14,
      title: authorizationText
    });

    const textWidth = font.widthOfTextAtSize(authorizationText, 14);
    page.drawLine({
      //underline
      end: {
        x: page.getWidth() / 2 - textWidth / 2 + 5 + textWidth,
        y: height.actual - 2
      },
      start: {
        x: page.getWidth() / 2 - textWidth / 2 - 5,
        y: height.actual - 2
      },
      thickness: 1
    });
    height.stepHugeLine();
    const paragraphText =
      "Pela presente, autorizo o setor de recursos humanos a efetuar o pagamento das horas extras, referentes ao período autorizado, conforme o relatório de cartão de ponto que deverá ser anexado a presente autorização.";
    await createParagraph({
      document,
      font,
      fontSize: 13,
      height,
      maxWidth: page.getWidth() - 200,
      text: paragraphText,
      x: 100
    });
    height.stepHugeLine();
    height.stepHugeLine();
    height.stepHugeLine();
    await createSign({
      document,
      height,
      name: "Sebastião Arosti",
      role: "Diretor do Departamento de Transporte"
    });
  }
};

export { render };
