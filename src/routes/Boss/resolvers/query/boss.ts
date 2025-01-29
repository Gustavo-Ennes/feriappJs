import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const bossResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<BossInterface | null | void> => {
  try {
    await verifyToken(context.token || "");

    const { _id } = args;
    const bossInstance: BossInterface | null = await Boss.findById(_id);
    return bossInstance;
  } catch (error) {
    const logger = getLogger("bossResolver");
    logger.error({ args }, `Error getting a boss: ${(error as Error).message}`);
    throw error;
  }
};

export { bossResolver };
