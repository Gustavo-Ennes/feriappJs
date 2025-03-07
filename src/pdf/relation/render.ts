import { StandardFonts } from "pdf-lib";

import { VacationInterface } from "../../routes/Vacation/types/vacation";
import {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  drawTopRightText
} from "../factory";
import { PdfFnParam } from "../types";
import { getHeightObject } from "../utils";
import { translateVacation } from "../vacation/utils";
import {
  getNoInstancesText,
  getRelationTitle,
  getTranslatedPeriod
} from "./data";
import { drawVacationRelationLine } from "./vacationLine";

const render = async ({
  document,
  instances,
  period,
  type
}: PdfFnParam): Promise<void> => {
  if (document && instances && period && type) {
    let page = document.addPage();
    let height = getHeightObject(page);
    const font = await document.embedFont(StandardFonts.Helvetica);
    const translatedType = translateVacation(type as string);
    const translatedTypePlural =
      type === "vacation" ? translatedType : `${translatedType}s`;

    await createHeader(document);
    await createFooter(document);

    if (!instances.length)
      await createParagraph({
        document,
        font,
        height,
        text: getNoInstancesText(translatedTypePlural)
      });
    else {
      await createTitle({
        document,
        height,
        size: 19,
        title: getRelationTitle({
          period: getTranslatedPeriod(period),
          translatedType: translatedTypePlural
        })
      });

      height.stepSmallLine();
      drawTopRightText({
        document,
        fontSize: 12,
        height,
        text: `${instances.length} registro${instances.length > 1 ? "s" : ""}`
      });

      height.stepHugeLine();

      for (let i = 0; i < instances.length; i++) {
        if (type === "vacation" || type === "license" || type === "dayOff") {
          await drawVacationRelationLine({
            document,
            font,
            height,
            index: i,
            vacation: instances[i] as VacationInterface
          });
          if (height.actual < 100) {
            page = document.addPage();
            height = getHeightObject(page);

            await createHeader(document);
            await createFooter(document);
          } else height.stepLine();
        }
      }
    }
  }
};

export { render };
