import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Boss } from "../../boss.model";
import { BossesResolverArgs, BossInterface } from "../../types/boss.interface";

const bossesResolver = async (
  _: unknown,
  args: BossesResolverArgs,
  context: { token?: string }
): Promise<BossInterface[] | void> => {
  try {
    await verifyToken(context.token || "");
    const { onlyDirectors } = args;

    const bossInstances: BossInterface[] = await Boss.find({
      isActive: true,
      ...(onlyDirectors !== undefined && { isDirector: onlyDirectors })
    });

    return bossInstances;
  } catch (error) {
    const logger = getLogger("bossesResolver");
    logger.error({ args }, `Error getting bosses: ${(error as Error).message}`);
    throw error;
  }
};

export { bossesResolver };
