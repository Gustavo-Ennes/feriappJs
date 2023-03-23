import { Vacation } from "../../../Vacation";
import { VacationInterface } from "../../../Vacation/types/vacation";
import { Worker } from "../../../Worker";
import { Department } from "../../../Department";
import { SearchResult } from "../../types/search";
import { WorkerInterface } from "../../../Worker/types/worker";

const searchResolver = async (
  _: any,
  args: { searchTerm: string },
  __: any,
  ___: any
): Promise<SearchResult> => {
  const { searchTerm } = args;
  const results: SearchResult = {};
  results.departments = await Department.find({
    name: { $regex: ".*" + searchTerm + ".*" },
  });
  results.workers = await Worker.find({
    name: { $regex: ".*" + searchTerm + ".*" },
  });
  const allVacations: VacationInterface[] = await Vacation.find({
    deferred: true,
  });
  results.vacations = [];
  results.workers.forEach(({ _id }) => {
    const vacations: VacationInterface[] = allVacations.filter(({ worker }) => {
      return (worker as WorkerInterface)._id?.toString() === _id?.toString();
    });
    vacations.forEach((vacation) => results.vacations?.push(vacation));
  });
  return results;
};

export { searchResolver };
