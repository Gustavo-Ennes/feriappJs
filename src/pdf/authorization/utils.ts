import { format, set, getDaysInMonth } from "date-fns";

import type { CreateTableDataParams, calculateExtraHoursParams } from "./types";
import { capitalizeName } from "../../utils/capitalize";
import { ExtraHourModel } from "../../routes/ExtraHour";
import { pluck, sum } from "ramda";

const calculateExtraHours = async ({
  worker,
  reference: _reference,
}: calculateExtraHoursParams): Promise<Number> => {
  const refFirstDay = set(_reference, {
    date: 1,
    seconds: 0,
    minutes: 0,
    milliseconds: 0,
    hours: 0,
    month: _reference.getMonth() - 1,
  });
  const refLasttDay = set(_reference, {
    date: getDaysInMonth(_reference),
    seconds: 59,
    minutes: 59,
    hours: 23,
    milliseconds: 999,
  });
  const reference = {
    $gte: refFirstDay,
    $lte: refLasttDay,
  };
  const extraHours = await ExtraHourModel.find({
    worker: worker._id,
    reference,
  });
  return sum(pluck("amount", extraHours));
};

const createTableData = async ({
  worker,
  reference,
}: CreateTableDataParams): Promise<string[]> => {
  const data: string[] = [];
  const firstDayReferenceMonth = format(
    set(reference, { date: 1 }),
    "dd/MM/yyyy"
  );
  const lastDayReferenceMonth = format(
    set(reference, { date: getDaysInMonth(reference) }),
    "dd/MM/yyyy"
  );
  const authorizationText: string = `
  Pela presente, autorizo o(a) servidor(a) acima designado, a realizar a quantidade de horas, extras previstas nessa autorização, com a finalidade de atender as necessidades, conforme as justificativas.
  `;
  const extraHoursNumber = await calculateExtraHours({
    worker,
    reference,
  });

  data.push(`Nome do servidor: ${capitalizeName(worker.name)}`);
  data.push(`Função: ${capitalizeName(worker.role)}`);
  data.push(
    `Período previsto para a realização das horas extras:\nde ${firstDayReferenceMonth} a ${lastDayReferenceMonth}`
  );
  data.push(
    `Horas extras prevista (aproximadamente): ${extraHoursNumber.toFixed(
      2
    )} horas`
  );
  data.push(`Justificativa:\n-> ${worker.justification}`);
  data.push(`Autorização:
    ${authorizationText}
   `);
  data.push(`Nome do diretor: Sebastião Arosti`);

  return data;
};

export { createTableData };
