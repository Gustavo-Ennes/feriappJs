import { Worker } from "../../worker.model";
import {
  WorkerInstanceOrNull,
} from "../../types/worker";

const workerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<WorkerInstanceOrNull> => {
  const { id } = args;
  const workerInstance: WorkerInstanceOrNull =
    await Worker.findByPk(id);
  return workerInstance;
};

export { workerResolver };
