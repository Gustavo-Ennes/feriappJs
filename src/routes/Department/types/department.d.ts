import { DataTypes, Model } from "sequelize";

export interface DepartmentAttrsInterface {
  name: DataTypes.STRING!;
  id: DataTypes.INTEGER;
}

export interface DepartmentModelInterface extends Model<DepartmentAttrs> {
  create(departmentInput: DepartmentAttrs): Promise<DepartmentInstance>;
  findAll(): Promise<DepartmentInstance[] | []>;
  findByPk(id: number): Promise<DepartmentInstance | null>;
  save(options?: any): Promise<this>;
}

export interface DepartmentInstanceInterface
  extends Model<DepartmentAttrs>,
    DepartmentAttrs {
      name: string;
      id: number;
}

export type DepartmentInstanceOrNull = DepartmentInstanceInterface | null
export type DepartmentInstancesOrEmpty = DepartmentInstanceInterface[] | []
