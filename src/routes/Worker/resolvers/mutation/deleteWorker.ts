import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker";
import { Vacation } from "../../../Vacation";

const deleteWorkerResolver = async (
  _: any,
  args: { _id: string },
  __: any,
  ___: any
): Promise<Boolean | undefined> => {
  const { _id } = args;
  const workerInstance: WorkerInterface | null = await Worker.findById(_id);

  if (!workerInstance) throw new Error("Worker doesn't exists.");

  await Worker.deleteOne({ _id });
  await Vacation.deleteMany({ worker: _id });
  return true;
};

export { deleteWorkerResolver };
