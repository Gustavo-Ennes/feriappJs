import { DataTypes, Model } from "sequelize";
import { WorkerInstanceInterface } from "../../Worker/types/worker";

export interface VacationAttrsInterface {
  id?: DataTypes.INTEGER;
  daysQtd: DataTypes.INTEGER<PremiumLicenseQtdPossibilities>;
  startDate: DataTypes.DATE;
  endDate?: DataTypes.DATE;
  workerId: DataTypes.INTEGER;
  deferred?: DataTypes.BOOLEAN;
  observation?: DataTypes.STRING;
  type: DataTypes.String;
  enjoyed?: DataTypes.BOOLEAN;
}

export interface VacationInterface extends Model<VacationAttrsInterface> {
  create(
    vacationInput: VacationAttrsInterface
  ): Promise<VacationInstanceInterface>;
  findAll(): Promise<WorkerInstanceInterface[] | []>;
  findByPk(id: number): Promise<VacationInstanceInterface | null>;
  save(options?: any): Promise<this>;
}

export interface VacationInstanceInterface
  extends Model<VacationAttrsInterface>,
    VacationAttrsInterface {
  setWorker(worker: WorkerInstanceInterface): Promise<void>;
}
export interface PipeContent {
  payload: VacationAttrsInterface;
  errorMessage: string;
  worker: WorkerInstanceOrNull;
}

export type VacationInstanceOrNull = VacationInstanceInterface | null;
export type VacationInstanceOrEmpty = VacationInstanceInterface[] | [];
export type VacationDaysQtdPossibilities = 15 | 30;
export type PremiumLicenseQtdPossibilities =
  | VacationDaysQtdPossibilities
  | 45
  | 60
  | 75
  | 90;
export type VacationTypes = "vacation" | "premiumLicense" | "dayOff";
export type VacationKeys =
  | "daysQtd"
  | "startDate"
  | "deferred"
  | "observation"
  | "type"
  | "enjoyed";
