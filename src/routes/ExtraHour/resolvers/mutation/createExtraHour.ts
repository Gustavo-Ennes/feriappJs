import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ExtraHourInterface } from "../../types/extraHour";

const createExtraHourResolver = async (
  _: any,
  args: { extraHourInput: ExtraHourInput },
  context: { token?: string },
  ___: any
): Promise<ExtraHourInterface> => {
  await verifyToken(context.token || "");

  const { extraHourInput } = args;
  const extraHourInstance: ExtraHourInterface = await ExtraHourModel.create(
    extraHourInput
  );
  return extraHourInstance;
};

export { createExtraHourResolver };
