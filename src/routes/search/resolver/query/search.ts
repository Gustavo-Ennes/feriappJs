import { verifyToken } from "../../../../firebase/firebase";
import { Vacation } from "../../../Vacation";
import { VacationInterface } from "../../../Vacation/types/vacation";
import { Worker } from "../../../Worker";
import { Department } from "../../../Department";
import { SearchResult } from "../../types/search";
import { WorkerInterface } from "../../../Worker/types/worker";

const searchResolver = async (
  _: any,
  args: { searchTerm: string },
  context: { token?: string },
  ___: any
): Promise<SearchResult> => {
  await verifyToken(context.token || "");

  const { searchTerm } = args;
  const results: SearchResult = {};
  results.departments = await Department.find({
    name: { $regex: ".*" + searchTerm + ".*" }
  });
  results.workers = await Worker.find({
    name: { $regex: ".*" + searchTerm + ".*" }
  })
    .populate("department")
    .exec();
  const allVacations: VacationInterface[] = await Vacation.find({
    deferred: true
  })
    .populate("worker")
    .exec();
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
