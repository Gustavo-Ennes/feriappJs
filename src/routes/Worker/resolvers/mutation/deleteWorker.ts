
import { Worker } from "../../worker.model";
import { WorkerInstanceOrNull } from "../../types/worker";

const deleteWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { id } = args;
  const workerInstance: WorkerInstanceOrNull =
    await Worker.findByPk(id);
  if (workerInstance) {
    await workerInstance.destroy();
    return true;
  }
  return false;
};

export { deleteWorkerResolver };
