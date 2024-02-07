import { partition } from "ramda";

import { verifyToken } from "../../../../firebase/firebase";
import { ExtraHourModel } from "../../extraHour.model";
import { ExtraHourInput, ProcessExtraHourReturn } from "../../types/extraHour";

const processExtraHoursResolver = async (
  _: any,
  args: { extraHourInput: ExtraHourInput[] },
  context: { token?: string },
  ___: any
): Promise<ProcessExtraHourReturn> => {
  await verifyToken(context.token || "");
  const { extraHourInput } = args;
  const [withId, withoutId] = partition(
    (extraHour: ExtraHourInput) => extraHour._id,
    extraHourInput
  );
  const toCreate = withoutId.filter(
    ({ amount = 0, nightlyAmount = 0 }) => amount > 0 || nightlyAmount > 0
  );
  const [toDelete, toUpdate] = partition(
    ({ amount = 0, nightlyAmount = 0 }) => !amount && !nightlyAmount,
    withId
  );
  const returnObj = {
    created: toCreate.length,
    deleted: toDelete.length,
    updated: toUpdate.length
  };

  await ExtraHourModel.insertMany(toCreate);
  toUpdate.forEach(async (item) => {
    await ExtraHourModel.replaceOne({ _id: item._id }, item);
  });

  toDelete.forEach(async (item) => {
    await ExtraHourModel.deleteOne({ _id: item._id });
  });
  return returnObj;
};

export { processExtraHoursResolver };
