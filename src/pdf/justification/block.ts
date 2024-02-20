import { StandardFonts } from "pdf-lib";

import type { DrawJustificationBlockParams } from "./types";

import { capitalizeName } from "../../utils/capitalize";
import {
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTitle
} from "../factory";

const drawJustificationBlock = async ({
  document,
  height,
  worker
}: DrawJustificationBlockParams): Promise<void> => {
  const page = document.getPage(0);
  const font = await document.embedFont(StandardFonts.Helvetica);
  await createHeader(document);
  await createFooter(document);

  await createTitle({
    document,
    height,
    size: 18,
    title: "justificativa de horas extras"
  });
  await createParagraph({
    document,
    font,
    fontSize: 9,
    height,
    maxWidth: page.getWidth() / 2,
    text: "*favor não recortar!*",
    x: page.getWidth() - 130
  });

  height.stepLine();
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: `Secretaria: ${capitalizeName(worker.department.name)}`
  });
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: "Setor: Transporte",
    x: page.getWidth() - 170
  });

  height.stepLine();
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: `Data: _____/______/${new Date().getFullYear()}`
  });
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: "Horário: _____:_____ ÁS _____:_____ ",
    x: page.getWidth() - 390
  });
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: "H.E.: ( _____ hs. )",
    x: page.getWidth() - 170
  });

  height.stepLine();
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: `Servidor: ${capitalizeName(worker.name)}`
  });
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    maxWidth: page.getWidth() / 2,
    text: `Matrícula: ${worker.matriculation}`,
    x: page.getWidth() - 170
  });

  height.stepLine();
  const underscore = {
    char: "_",
    getLine: function () {
      while (this.times > 0) {
        this.line += this.char;
        underscore.times--;
      }
      return this.line;
    },
    line: "",
    times: 65
  };
  await createParagraph({
    document,
    font,
    fontSize: 12,
    height,
    text: `Motivo: ${underscore.getLine()}`
  });

  height.stepHugeLine();
  await createSign({
    document,
    height,
    name: capitalizeName(worker.name),
    role: capitalizeName(worker.role),
    x: 150
  });
  await createSign({
    document,
    height,
    name: "Sebastião Arosti",
    role: "Diretor de Transporte",
    x: 450
  });
  height.stepLines(3, "huge");
};

export { drawJustificationBlock };
