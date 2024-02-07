import { verifyToken } from "../../../../firebase/firebase";
import { Worker } from "../../worker.model";
import { WorkerInterface } from "../../types/worker.d";
import { validateMatriculationNumbers } from "./validation/matriculation";

const updateWorkerResolver = async (
  _: any,
  args: { workerInput: WorkerInterface },
  context: { token?: string },
  ___: any
): Promise<Boolean> => {
  await verifyToken(context.token || "");

  const { workerInput }: { workerInput: WorkerInterface } = args;

  const workerInstance: WorkerInterface | null = await Worker.findById(
    workerInput._id
  )
    .populate("department")
    .exec();
  console.log("🚀 ~ workerInstance:", workerInstance);
  if (!workerInstance) throw new Error("Worker doesn't exists.");

  const { error, success } = await validateMatriculationNumbers(workerInput);
  if (!success) throw new Error(`validation error: ${error}`);

  await Worker.updateOne({ _id: workerInput._id }, workerInput);
  return true;
};

export { updateWorkerResolver };
