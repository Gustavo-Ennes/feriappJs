import { StandardFonts } from "pdf-lib";

import type { PdfFnParam } from "../types";

import { DepartmentInterface } from "../../routes/Department/types/department";
import { ExtraHourInterface } from "../../routes/ExtraHour/types/extraHour";
import { capitalizeName } from "../../utils/capitalize";
import {
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTitle
} from "../factory";
import { getHeightObject } from "../utils";
import { createReportTable, monthString } from "./utils";

const render = async ({
  document,
  extraHours,
  instance,
  reference
}: PdfFnParam): Promise<void> => {
  if (document) {
    const department = instance as DepartmentInterface;
    const page = document.addPage();
    const height = getHeightObject(page);
    const font = await document.embedFont(StandardFonts.Helvetica);

    await createHeader(document);
    await createFooter(document);

    await createTitle({
      document,
      height,
      offset: 20,
      size: 16,
      title: "relatório mensal de horas extras - divisão de transporte"
    });
    height.stepLines(2, "huge");

    const identificationParagraph = `
    Secretaria: ${department.name.toLocaleUpperCase()}
    Mês: ${monthString(reference as Date)}
    `;
    await createParagraph({
      document,
      font,
      fontSize: 14,
      height,
      text: identificationParagraph,
      x: 20
    });
    height.stepLines(2, "huge");

    await createReportTable({
      document,
      extraHours: extraHours as ExtraHourInterface[],
      height
    });
    height.stepLines(3, "huge");

    await createSign({
      document,
      height,
      name: "Sebastião Arosti",
      role: "Diretor Municipal de Transporte"
    });
    height.stepLines(2, "huge");

    await createSign({
      document,
      height,
      name: capitalizeName(department.responsible),
      role: `Secretaria de ${capitalizeName(department.name)}`
    });
  }
};

export { render };
