import { DataTypes, Model } from "sequelize";
import { WorkerInstanceInterface } from "../../Worker/types/worker";

export interface DepartmentAttrsInterface {
  name: DataTypes.STRING!;
  id: DataTypes.INTEGER;
}

export interface DepartmentInterface extends Model<DepartmentAttrs> {
  create(
    departmentInput: DepartmentAttrsInterface
  ): Promise<DepartmentInstanceInterface>;
  findAll(): Promise<DepartmentInstancesOrEmpty>;
  findByPk(id: number): Promise<DepartmentInstanceOrNull>;
  save(options?: any): Promise<this>;
}

export interface DepartmentInstanceInterface
  extends Model<DepartmentAttrsInterface>,
    DepartmentAttrsInterface {
  addWorker(worker: WorkerInstanceInterface): Promise<void>;
}

export type DepartmentInstanceOrNull = DepartmentInstanceInterface | null;
export type DepartmentInstancesOrEmpty = DepartmentInstanceInterface[] | [];
