import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossesResolverArgs, BossInterface } from "../../types/boss.interface";

const bossesResolver = async (
  _: unknown,
  args: BossesResolverArgs,
  context: { token?: string }
): Promise<BossInterface[] | undefined> => {
  try {
    await verifyToken(context.token || "");
    const { onlyDirectors } = args;

    const bossInstances: BossInterface[] = await Boss.find({
      ...(onlyDirectors !== undefined && { isDirector: onlyDirectors })
    });

    return bossInstances;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};

export { bossesResolver };
