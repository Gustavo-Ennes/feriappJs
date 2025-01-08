import { verifyToken } from "../../../../firebase/firebase";
import { Boss } from "../../boss.model";
import { BossInterface } from "../../types/boss.interface";

const deleteBossResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string }
): Promise<boolean> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const bossIntance: BossInterface | null =
    await Boss.findById(_id);
  if (bossIntance) {
    await Boss.deleteOne({ _id });
    return true;
  }
  return false;
};

export { deleteBossResolver };
