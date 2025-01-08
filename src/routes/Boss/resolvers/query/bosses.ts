import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const bossesResolver = async (
  _: unknown,
  __: unknown,
  context: { token?: string }
): Promise<BossInterface[] | undefined> => {
  try {
    await verifyToken(context.token || "");

    const bossInstances: BossInterface[] = await Boss.find({});

    return bossInstances;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export { bossesResolver };
