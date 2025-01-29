import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Department } from "../../../Department";
import { Vacation } from "../../../Vacation";
import { VacationInterface } from "../../../Vacation/types/vacation";
import { Worker } from "../../../Worker";
import { WorkerInterface } from "../../../Worker/types/worker";
import { SearchResult } from "../../types/search";

const searchResolver = async (
  _: unknown,
  args: { searchTerm: string },
  context: { token?: string }
): Promise<SearchResult | void> => {
  try {
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
      const vacations: VacationInterface[] = allVacations.filter(
        ({ worker }) => {
          return (
            (worker as WorkerInterface)._id?.toString() === _id?.toString()
          );
        }
      );
      vacations.forEach((vacation) => results.vacations?.push(vacation));
    });
    return results;
  } catch (error) {
    const logger = getLogger("searchResolver");
    logger.error(
      { args },
      `Erro returning search results: ${(error as Error).message}`
    );
    throw error;
  }
};

export { searchResolver };
