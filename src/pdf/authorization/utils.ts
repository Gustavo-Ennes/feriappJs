import { format, getDaysInMonth, set } from "date-fns";
import { pluck, sum } from "ramda";

import type { CreateTableDataParams, calculateExtraHoursParams } from "./types";

import { ExtraHourModel } from "../../routes/ExtraHour";
import { capitalizeName } from "../../utils/capitalize";

export const calculateExtraHours = async ({
  reference: _reference,
  worker
}: calculateExtraHoursParams): Promise<number> => {
  const refFirstDay = set(_reference, {
    date: 1,
    hours: 0,
    milliseconds: 0,
    minutes: 0,
    month: _reference.getMonth() - 1,
    seconds: 0
  });
  const refLasttDay = set(_reference, {
    date: getDaysInMonth(_reference),
    hours: 23,
    milliseconds: 999,
    minutes: 59,
    seconds: 59
  });
  const reference = {
    $gte: refFirstDay,
    $lte: refLasttDay
  };
  const extraHours = await ExtraHourModel.find({
    reference,
    worker: worker._id
  });
  return sum(pluck("amount", extraHours));
};

const createTableData = async ({
  reference,
  worker
}: CreateTableDataParams): Promise<string[][]> => {
  const data: string[][] = [];
  const firstDayReferenceMonth = format(
    set(reference, { date: 1 }),
    "dd/MM/yyyy"
  );
  const lastDayReferenceMonth = format(
    set(reference, { date: getDaysInMonth(reference) }),
    "dd/MM/yyyy"
  );
  const authorizationText: string =
    "Pela presente, autorizo o servidor acima designado, a realizar a quantidade de horas, extras previstas nessa autorização, com a finalidade de atender as necessidades, conforme as justificativas.";
  const extraHoursNumber = await calculateExtraHours({
    reference,
    worker
  });

  data.push([`Nome do servidor: ${capitalizeName(worker.name)}`]);
  data.push([`Função: ${capitalizeName(worker.role)}`]);
  data.push([
    `Período previsto para a realização das horas extras: de ${firstDayReferenceMonth} a ${lastDayReferenceMonth}`
  ]);
  data.push([
    `Horas extras prevista (aproximadamente): ${extraHoursNumber.toFixed(
      2
    )} horas`
  ]);
  data.push([`Justificativa: -> ${worker.justification}`]);
  data.push([`Autorização: ${authorizationText}`]);
  data.push(["Nome do diretor: Sebastião Arosti"]);

  return data;
};

export { createTableData };
