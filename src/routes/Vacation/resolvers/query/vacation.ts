import { verifyToken } from "../../../../firebase/firebase";
import { VacationInterface } from "../../types/vacation";
import { Vacation } from "../../vacation.model";

const vacationResolver = async (
  _: any,
  args: { _id: string },
  context: { token?: string },
  ___: any
): Promise<VacationInterface | null> => {
  await verifyToken(context.token || "");

  const { _id } = args;
  const vacationInstance: VacationInterface | null = await Vacation.findById(
    _id
  );
  return vacationInstance;
};

export { vacationResolver };
