import { Error } from "mongoose";

import { verifyToken } from "../../../../firebase/firebase";
import { Pagination } from "../../../../types/pagination.interface";
import {
  VacationInterface,
  VacationsResolverArgsInterface
} from "../../types/vacation";
import { Vacation } from "../../vacation.model";
import { buildOptions } from "./utils";

const vacationsResolver = async (
  _: unknown,
  args: VacationsResolverArgsInterface,
  context: { token?: string }
): Promise<Pagination<VacationInterface>> => {
  const response: Pagination<VacationInterface> = {
    items: [],
    pageNumber: 0,
    totalPages: 0,
    totalResults: 0
  };

  try {
    await verifyToken(context.token || "");

    const options = buildOptions(args);
    const ITEMS_PER_PAGE = 20;
    const { page = 1 } = args;

    const vacationInstances: VacationInterface[] = await Vacation.find(options)
      .populate("worker")
      .populate("boss")
      .exec();
    const sortedVacationInstances: VacationInterface[] = vacationInstances.sort(
      (a, b) => b.startDate - a.startDate
    );

    const totalPages = Math.ceil(
      sortedVacationInstances.length / ITEMS_PER_PAGE
    );
    if (page > totalPages && totalPages > 0)
      throw new Error("This page doesn't exists in this query results.");

    response.totalResults = sortedVacationInstances.length;
    response.pageNumber = page;
    response.totalPages = totalPages || page; //to empty pages(totalPages === 0);
    response.items = sortedVacationInstances.slice(
      page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.log("🚀 ~ error.message:", message);
    response.error = message;
  }
  return response;
};

export { vacationsResolver };
