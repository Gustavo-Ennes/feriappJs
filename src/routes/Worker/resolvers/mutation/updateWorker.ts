import { Worker } from "../../worker.model";
import {
  WorkerAttrsInterface,
  WorkerInstanceOrNull,
  WorkerKeys,
} from "../../types/worker.d";

const updateWorkerResolver = async (
  _: any,
  args: any,
  __: any,
  ___: any
): Promise<Boolean> => {
  const { workerInput }: { workerInput: WorkerAttrsInterface } = args;
  const workerInstance: WorkerInstanceOrNull = await Worker.findByPk(
    workerInput.id
  );

  if (workerInstance) {
    const inputKeys: WorkerKeys[] = (Object.keys(workerInput) as WorkerKeys[]);
    inputKeys.forEach((key: WorkerKeys ): void => {
      workerInstance[key] = workerInput[key];
    });

    return true;
  }
  return false;
};

export { updateWorkerResolver };
