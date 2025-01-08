import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const bossResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<BossInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const bossInstance: BossInterface | null = await Boss.findById(_id);
  return bossInstance;
};

export { bossResolver };
