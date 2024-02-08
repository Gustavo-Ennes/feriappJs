import { verifyToken } from "../../../../firebase/firebase";
import { WorkerInterface } from "../../types/worker.d";
import { Worker } from "../../worker.model";
import { validateMatriculationNumbers } from "./validation/matriculation";

const updateWorkerResolver = async (
  _: unknown,
  args: { workerInput: WorkerInterface },
  context: { token?: string }
): Promise<boolean> => {
  await verifyToken(context.token || "");

  const { workerInput }: { workerInput: WorkerInterface } = args;

  const workerInstance: WorkerInterface | null = await Worker.findById(
    workerInput._id
  )
    .populate("department")
    .exec();

  if (!workerInstance) throw new Error("Worker doesn't exists.");

  const { error, success } = await validateMatriculationNumbers(workerInput);
  if (!success) throw new Error(`validation error: ${error}`);

  await Worker.updateOne({ _id: workerInput._id }, workerInput);
  return true;
};

export { updateWorkerResolver };
