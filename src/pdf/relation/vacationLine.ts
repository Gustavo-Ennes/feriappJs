import { format } from "date-fns";
import { PDFDocument, PDFFont } from "pdf-lib";

import { VacationInterface } from "../../routes/Vacation/types/vacation";
import { createParagraph } from "../factory";
import { Height } from "../types";
import { getRelationItemText } from "./data";

const drawVacationRelationLine = async ({
  document,
  font,
  height,
  index,
  vacation
}: {
  vacation: VacationInterface;
  document: PDFDocument;
  height: Height;
  font: PDFFont;
  index: number;
}) =>
  await createParagraph({
    document,
    font,
    fontSize: 14,
    height,
    text: getRelationItemText({
      formatedDate: format(vacation.startDate, "dd/MM/yyyy"),
      index,
      vacation: vacation
    })
  });

export { drawVacationRelationLine };
