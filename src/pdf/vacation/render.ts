import { StandardFonts } from "pdf-lib";

import type { VacationInterface } from "../../routes/Vacation/types/vacation";
import type { WorkerInterface } from "../../routes/Worker/types/worker";
import type { DrawHalfPageParams, PdfFnParam } from "../types";

import { BossInterface } from "../../routes/Boss/types/boss.interface";
import { capitalizeName } from "../../utils/capitalize";
import {
  createDaysQtd,
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTitle
} from "../factory";
import { getHeightObject, getBoss } from "../utils";
import {
  getParagraph,
  translateMonth,
  translateVacation
} from "./utils";

const drawHalfPage = async ({
  document,
  height,
  vacation
}: DrawHalfPageParams): Promise<void> => {
  const page = document.getPage(0);
  const paragraph = getParagraph(vacation);
  const font = await document.embedFont(StandardFonts.Helvetica);

  await createHeader(document);
  await createFooter(document);
  await createDaysQtd({
    daysQtd: vacation.daysQtd,
    document,
    height,
    subtype: vacation.subType
  });
  await createTitle({
    document,
    height,
    size: 19,
    title: `Requerimento de ${translateVacation(vacation.type)}`
  });
  height.stepHugeLine();
  await createParagraph({
    document,
    font,
    fontSize: vacation.type === "license" ? 12 : 14,
    height,
    text: paragraph
  });

  height.stepLines(3, "huge");

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
      y: height.actual - 15
    }),
    font,
    maxWidth: page.getWidth()
  });

  height.stepLines(3, "huge");
  await createSign({
    document,
    height,
    matriculation: (vacation.worker as unknown as WorkerInterface)
      .matriculation,
    name: capitalizeName((vacation.worker as unknown as WorkerInterface).name),
    role: capitalizeName((vacation.worker as unknown as WorkerInterface).role)
  });

  height.stepLines(3, "huge");
  const boss = vacation.boss ?? (await getBoss(vacation));

  if (!boss)
    throw new Error(
      `Não há chefe cadastrado para a assinatura de ${translateVacation(vacation.type)}.`
    );

  const { name: bossName, role: bossRole } = (vacation.boss ??
    (await getBoss(vacation))) as BossInterface;
  await createSign({
    document,
    height,
    name: bossName,
    role: bossRole
  });
};

const render = async ({ document, instance }: PdfFnParam): Promise<void> => {
  if (document && instance) {
    const page = document.addPage();
    const height = getHeightObject(page);
    const vacation = instance as VacationInterface;

    await drawHalfPage({
      document,
      height,
      vacation
    });

    height.stepLines(4, "huge");

    await drawHalfPage({
      document,
      height,
      vacation
    });
  }
};

export { render };
