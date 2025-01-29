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
    try {
      await verifyToken(context.token || "");
      const { onlyDirectors } = args;

      const bossInstances: BossInterface[] = await Boss.find({
        ...(onlyDirectors !== undefined && { isDirector: onlyDirectors })
      });

      return bossInstances;
    } catch (error) {
      const logger = getLogger("bossesResolver");
      logger.error(
        { args },
        `Erro getting bosses: ${(error as Error).message}`
      );
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export { bossesResolver };
