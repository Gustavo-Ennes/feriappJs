import type { PdfFnParam } from "../types";
import {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  createSign,
} from "../factory";
import { getHeightObject } from "../utils";
import { DepartmentInterface } from "../../routes/Department/types/department";
import { createReportTable, monthString } from "./utils";
import { ExtraHourInterface } from "../../routes/ExtraHour/types/extraHour";
import { capitalizeName } from "../../utils/capitalize";

const render = async ({
  document,
  instance,
  reference,
  extraHours,
}: PdfFnParam): Promise<void> => {
  if (document) {
    const department = instance as DepartmentInterface;
    const page = document.addPage();
    const height = getHeightObject(page);
    await createHeader(document);
    await createFooter(document);

    await createTitle({
      document,
      height,
      title: "relatório mensal de horas extras - divisão de transporte",
      size: 16,
      offset: 20,
    });
    height.stepHugeLine();
    height.stepHugeLine();

    const identificationParagraph = `
    Secretaria: ${department.name.toLocaleUpperCase()}
    Mês: ${monthString(reference as Date)}
    `;
    await createParagraph({
      document,
      height,
      text: identificationParagraph,
      fontSize: 14,
      x: 20,
    });
    height.stepHugeLine();
    height.stepHugeLine();

    await createReportTable({
      document,
      extraHours: extraHours as ExtraHourInterface[],
      height,
    });
    height.stepHugeLine();
    height.stepHugeLine();
    height.stepHugeLine();

    await createSign({
      name: "Sebastião Arosti",
      role: "Diretor Municipal de Transporte",
      document,
      height,
    });
    height.stepHugeLine();
    height.stepHugeLine();

    await createSign({
      name: `Secretário(a) Municipal`,
      role: `Secretaria de ${capitalizeName(department.name)}`,
      document,
      height,
    });
  }
};

export { render };
