import { VacationInterface } from "../../routes/Vacation/types/vacation";
import { WorkerInterface } from "../../routes/Worker/types/worker";
import { capitalizeName } from "../../utils/capitalize";

const getNoInstancesText = (instanceTranslatedPluralName: string) =>
  `Não há ${instanceTranslatedPluralName}.`;

const getRelationTitle = ({
  period,
  translatedType
}: {
  translatedType: string;
  period: string;
}) => `Relação de ${translatedType}${period ? ": " + period : ""}`;

const getRelationItemText = ({
  formatedDate,
  index,
  vacation
}: {
  index: number;
  formatedDate: string;
  vacation: VacationInterface;
}) => {
  const { daysQtd, worker } = vacation;
  const daysQtdString = `${daysQtd < 1 ? "½" : daysQtd} dia${daysQtd > 1 ? "s" : ""}`;
  const workerString = `${capitalizeName((worker as WorkerInterface).name)}(${(worker as WorkerInterface).matriculation})`;
  return `${index + 1} - ${formatedDate} - ${daysQtdString} - ${workerString}`;
};

const getTranslatedPeriod = (period: string) => {
  switch (period) {
    case "past":
      return "passado";
    case "present":
      return "presente";
    case "future":
      return "futuros";
    default:
      return "";
  }
};

export {
  getNoInstancesText,
  getRelationItemText,
  getRelationTitle,
  getTranslatedPeriod
};
