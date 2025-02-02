// this was used to populate new column (before computed column)
// in mongoDB collections

import { add, isBefore } from "date-fns";

import { Boss } from "../../routes/Boss";
import { Vacation } from "../../routes/Vacation";

const populatePreExistentWithEndDate = async () => {
  const vacations = await Vacation.find();
  const boss = await Boss.findOne();
  const idBarbosa = "677e87dff4e2466f08f55c72";
  const idTiao = "679bc790d1074b6bad48427b";

  vacations.forEach(async (vacation) => {
    // const shouldUpdate = !vacation.endDate || !vacation.boss;
    vacation.endDate = new Date(
      add(vacation.startDate, {
        ...(vacation.daysQtd >= 1 && { days: vacation.daysQtd }),
        ...(vacation.daysQtd == 0.5 && { hours: 12 })
      })
    );

    if (!vacation.boss && boss) {
      vacation.boss = isBefore(
        new Date(vacation.createdAt),
        add(new Date("2025-01-01"), { hours: 3 })
      )
        ? idTiao
        : idBarbosa;
    }

    // if (shouldUpdate) await vacation.save();
  });
};

export { populatePreExistentWithEndDate };
