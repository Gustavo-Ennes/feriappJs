import { DepartmentInterface } from "../../Department/types/department";
import { VacationInterface } from "../../Vacation/types/vacation";
import { WorkerInterface } from "../../Worker/types/worker";

interface SearchResult {
  vacations?: VacationInterface[];
  workers?: WorkerInterface[];
  departments?: DepartmentInterface[];
}

export { SearchResult };
