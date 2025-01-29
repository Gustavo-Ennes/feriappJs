import { verifyToken } from "../../../../firebase/firebase";
import { getLogger } from "../../../../logger/logger";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const createBossResolver = async (
  _: unknown,
  args: { bossInput: BossInterface },
  context: { token?: string }
): Promise<BossInterface | void> => {
  try {
    await verifyToken(context.token || "");

    const { bossInput } = args;
    const bossInstance: BossInterface = await Boss.create(bossInput);
    return bossInstance;
  } catch (error) {
    const logger = getLogger("createBossResolver");
    logger.error(
      { args },
      `Erro at creating boss: ${(error as Error).message}`
    );
  }
};

export { createBossResolver };
