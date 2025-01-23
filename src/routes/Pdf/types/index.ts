import { PeriodOptionsType } from "../../Vacation/types/vacation";

export interface PdfResolverArgsInterface {
  workerId?: string;
  departmentId?: string;
  vacationId?: string;
  reference?: string;
  period?: PeriodOptionsType;
  type?: string;
}
