import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const createBossResolver = async (
  _: unknown,
  args: { bossInput: BossInterface },
  context: { token?: string }
): Promise<BossInterface> => {
  await verifyToken(context.token || "");

  const { bossInput } = args;
  const bossInstance: BossInterface = await Boss.create(bossInput);
  return bossInstance;
};

export { createBossResolver };
