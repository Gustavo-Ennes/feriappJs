import { format } from "date-fns";
import type { VacationInterface } from "../../routes/Vacation/types/vacation";
import {
  translateVacation,
  translateVacationSubtype,
  numberToNumberString
} from "./utils";

const vacationParagraphBegin = (vacation: VacationInterface): string => `
\tAtravés deste, venho solicitar ${translateVacation(vacation.type)} de ${
  vacation.type === "dayOff"
    ? translateVacationSubtype(vacation.subType as string)
    : `${vacation.daysQtd} (${numberToNumberString(
        vacation.daysQtd
      )}) dia(s) de fruição`
}, `;

const vacationParagraphEnd = (
  vacation: VacationInterface
): string => `com início no dia ${format(
  new Date(vacation.startDate),
  "dd/MM/yyyy"
)} e término no dia ${format(
  new Date(vacation.endDate as string),
  "dd/MM/yyyy"
)}.\n\nNesses termos, peço deferimento.
`;

const vacationParagraph = (vacation: VacationInterface): string =>
  vacationParagraphBegin(vacation).concat(vacationParagraphEnd(vacation));

const dayOffParagraph = (vacation: VacationInterface): string => `
\tAtravés deste, venho requerer a Vossa Senhoria, conforme dispõe a Lei Complementar 001/1993 em seu capítulo IV, artigo 129, inciso IV o abono de trabalho de ${
  vacation.subType === "integral" ? "1(um) dia" : "meio experiente"
}, usufruindo em ${format(
  new Date(vacation.startDate),
  "dd/MM/yyyy"
)} para tratar de assuntos de interesse particular.\n\nNesses termos, peço deferimento.
`;

const licenseParagraph = (vacation: VacationInterface): string => `
Através deste, venho solicitar a Vossa Senhoria, de acordo com os artigos 121 a 124
da Lei Complementar 001/93 de 01/02/1993 e Lei Complementar121/2007, de 17/01/2007, o
período de gozo da Licênça Prêmio por Assiduidade, de ${
  vacation.daysQtd
}(${numberToNumberString(vacation.daysQtd)}) dias, no período de:
${format(new Date(vacation.startDate), "dd/MM/yyyy")} a ${format(
  new Date(vacation.endDate as string),
  "dd/MM/yyyy"
)}
`;

export { vacationParagraph, dayOffParagraph, licenseParagraph };
