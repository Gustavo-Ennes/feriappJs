import { DataTypes, Model } from "sequelize";
import { DepartmentInstanceInterface } from "../../Department/types/department";
import {
  VacationInstanceInterface,
  VacationInstanceOrEmpty,
} from "../../Vacation/types/vacation";

export interface WorkerAttrsInterface {
  id?: DataTypes.INTEGER;
  name: DataTypes.STRING;
  role: DataTypes.STRING;
  admissionDate: DataTypes.DATE;
  status: DataTypes.STRING;
  registry: DataTypes.STRING;
  matriculation: DataTypes.STRING;
  departmentId?: DataTypes.INTEGER;
}

export interface WorkerInterface extends Model<WorkerAttrsInterface> {
  create(workerInput: WorkerAttrsInterface): Promise<WorkerInstanceInterface>;
  findAll(): Promise<WorkerInstanceInterface[] | []>;
  findByPk(id: number): Promise<WorkerInstanceInterface | null>;
  save(options?: any): Promise<this>;
}

export interface WorkerInstanceInterface
  extends Model<WorkerAttrsInterface>,
    WorkerAttrsInterface {
  setDepartment(department: DepartmentInstanceInterface): Promise<void>;
  addVacation(vacation: VacationInstanceInterface): Promise<void>;
  getVacations(where: any): Promise<VacationInstanceOrEmpty>;
}

export type WorkerInstanceOrNull = WorkerInstanceInterface | null;
export type WorkerInstanceOrEmpty = WorkerInstanceInterface[] | [];
export type WorkerKeys =
  | "name"
  | "role"
  | "admissionDate"
  | "status"
  | "registry"
  | "matriculation";
