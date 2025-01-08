import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const updateBossResolver = async (
  _: unknown,
  args: { bossInput: BossInterface },
  context: { token?: string }
): Promise<boolean> => {
  await verifyToken(context.token || "");

  const { bossInput } = args;
  const bossInstance: BossInterface | null = await Boss.findById(bossInput._id);
  if (bossInstance) {
    await Boss.updateOne({ _id: bossInput._id }, bossInput);
    return true;
  }

  return false;
};

export { updateBossResolver };
