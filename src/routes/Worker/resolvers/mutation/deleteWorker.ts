import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Vacation } from "../../../Vacation";
import { WorkerInterface } from "../../types/worker";
import { Worker } from "../../worker.model";

const deleteWorkerResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<boolean | undefined> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const workerInstance: WorkerInterface | null = await Worker.findById(_id)
      .populate("department")
      .exec();

    if (!workerInstance) throw new Error("Worker doesn't exists.");

    await Worker.deleteOne({ _id });
    await Vacation.deleteMany({ worker: _id });
    return true;
  } catch (error) {
    const logger = getLogger("deleteWorkerResolver");
    logger.error(
      { args },
      `Error at deleting worker: ${(error as Error).message}`
    );
    throw error;
  }
};

export { deleteWorkerResolver };
