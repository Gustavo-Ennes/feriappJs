import { format } from "date-fns";

import { WorkerInterface } from "../../routes/Worker/types/worker";
import { capitalizeName } from "../../utils/capitalize";
import { calculateExtraHours } from "./utils";

export const getAuthorizationPdfData = async (
  worker: WorkerInterface,
  reference: Date
) => {
  const extraHoursNumber = await calculateExtraHours({
    reference,
    worker
  });
  return [
    ["Nome do servidor", capitalizeName(worker.name)],
    ["Função", worker.role],
    [
      "Período previsto para realização das horas extras",
      `de ${format(reference, "dd/MM/yyyy")} a ${format(
        reference,
        "dd/MM/yyyy"
      )}`
    ],
    ["Horas extras previstas", `${extraHoursNumber.toFixed(2)} horas`],
    ["Justificativa", worker.justification],
    [
      "Autorização",
      "Pela presente, autorizo o servidor acima designado,a realizar a quantidade de horas, extras previstas nessa autorização,com a finalidade de atender as necessidades,conforme as justificativas."
    ],
    ["Nome do diretor", "Sebastião Arosti"]
  ];
};
