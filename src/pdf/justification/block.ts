import {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  createSign,
} from "../factory";
import type { DrawJustificationBlockParams } from "./types";
import { capitalizeName } from "../../utils/capitalize";

const drawJustificationBlock = async ({
  document,
  height,
  worker,
}: DrawJustificationBlockParams): Promise<void> => {
  const page = document.getPage(0);
  await createHeader(document);
  await createFooter(document);

  await createTitle({
    document,
    height,
    title: "justificativa de horas extras",
    size: 18,
  });
  await createParagraph({
    document,
    height,
    text: "*favor não recortar!*",
    x: page.getWidth() - 130,
    fontSize: 9,
  });

  height.stepLine();
  await createParagraph({
    document,
    height,
    text: `Secretaria: ${capitalizeName(worker.department.name)}`,
    fontSize: 12,
  });
  await createParagraph({
    document,
    height,
    text: `Setor: Transporte`,
    x: page.getWidth() - 170,
    fontSize: 12,
  });

  height.stepLine();
  await createParagraph({
    document,
    height,
    text: `Data: _____/______/${new Date().getFullYear()}`,
    fontSize: 12,
  });
  await createParagraph({
    document,
    height,
    text: `Horário: _____:_____ ÁS _____:_____ `,
    x: page.getWidth() - 390,
    fontSize: 12,
  });
  await createParagraph({
    document,
    height,
    text: `H.E.: ( _____ hs. )`,
    x: page.getWidth() - 170,
    fontSize: 12,
  });

  height.stepLine();
  await createParagraph({
    document,
    height,
    text: `Servidor: ${capitalizeName(worker.name)}`,
    fontSize: 12,
  });
  await createParagraph({
    document,
    height,
    text: `Matrícula: ${worker.matriculation}`,
    x: page.getWidth() - 170,
    fontSize: 12,
  });

  height.stepLine();
  const underscore = {
    char: "_",
    times: 65,
    line: "",
    getLine: function () {
      while (this.times > 0) {
        this.line += this.char;
        underscore.times--;
      }
      return this.line;
    },
  };
  await createParagraph({
    document,
    height,
    text: `Motivo: ${underscore.getLine()}`,
    fontSize: 12,
  });

  height.stepHugeLine();
  await createSign({
    name: capitalizeName(worker.name),
    role: capitalizeName(worker.role),
    document,
    height,
    x: 150,
  });
  height.actual += 44;
  await createSign({
    name: "Sebastião Arosti",
    role: "Diretor de Transporte",
    document,
    height,
    x: 450,
  });
  height.stepLine();
  height.stepSmallLine();
};

export { drawJustificationBlock };
