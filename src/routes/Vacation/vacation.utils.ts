import { endOfDay, startOfDay } from "date-fns";

const now = new Date();
const todayStartDate = startOfDay(now);
const todayEndDate = endOfDay(now);

export { todayEndDate, todayStartDate };
