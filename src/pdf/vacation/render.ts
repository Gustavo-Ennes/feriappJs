import {
  createDaysQtd,
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTitle,
} from "../factory";
import type { PdfFnParam } from "../types";
import type { DrawHalfPageParams } from "../types";
import type { VacationInterface } from "../../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../../routes/Worker/types/worker";
import { getParagraph, translateMonth, translateVacation } from "./utils";
import { capitalizeName } from "../../utils/capitalize";
import { getHeightObject } from "../utils";

const drawHalfPage = async ({
  document,
  height,
  vacation,
}: DrawHalfPageParams): Promise<void> => {
  const page = document.getPage(0);
  const paragraph = getParagraph(vacation);

  await createHeader(document);
  await createFooter(document);
  await createDaysQtd({
    document,
    daysQtd: vacation.daysQtd,
    height,
    subtype: vacation.subType,
  });
  await createTitle({
    title: `Requerimento de ${translateVacation(vacation.type)}`,
    document,
    height,
    size: 19,
  });

  height.stepHugeLine();
  await createParagraph({
    document,
    height,
    text: paragraph,
    fontSize: vacation.type === "license" ? 12 : 14,
  });

  height.stepHugeLine();
  height.stepHugeLine();
  height.stepSmallLine();

  const dateString = `Ilha solteira, ${new Date(
    vacation.updatedAt
  ).getDate()} de ${translateMonth(
    new Date(vacation.updatedAt).getMonth()
  )} de ${new Date(vacation.updatedAt).getFullYear()}`;
  await createParagraph({
    document,
    height,
    text: dateString,
    x: page.getWidth() - dateString.length * 7.5,
    ...(vacation.type === "dayOff" && {
      y: height.actual - 15,
    }),
  });

  height.stepHugeLine();
  height.stepSmallLine();
  await createSign({
    document,
    height,
    name: capitalizeName((vacation.worker as unknown as WorkerInterface).name),
    matriculation: (vacation.worker as unknown as WorkerInterface)
      .matriculation,
    role: capitalizeName((vacation.worker as unknown as WorkerInterface).role),
  });

  height.stepHugeLine();
  await createSign({
    document,
    height,
    name: "Sebastião Arosti",
    role: "Diretor do transporte",
  });
};

const render = async ({ document, instance }: PdfFnParam): Promise<void> => {
  if (document) {
    const page = document.addPage();
    const height = getHeightObject(page);

    await drawHalfPage({
      document,
      height,
      vacation: instance as VacationInterface,
    });
    
    height.stepHugeLine();
    await drawHalfPage({
      document,
      height,
      vacation: instance as VacationInterface,
    });
  }
};

export { render };
