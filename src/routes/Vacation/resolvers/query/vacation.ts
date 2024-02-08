import { verifyToken } from "../../../../firebase/firebase";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const vacationResolver = async (
  _: unknown,
  args: { _id: string },
  context: { token?: string },
): Promise<VacationInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const vacationInstance: VacationInterface | null = await Vacation.findById(
    _id
  )
    .populate("worker")
    .exec();
  return vacationInstance;
};

export { vacationResolver };
