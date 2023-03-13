import { sub, add } from "date-fns";

const now = new Date();
const todayStartDate = sub(now, {
  hours: now.getHours() - 3,
  minutes: now.getMinutes(),
  seconds: now.getSeconds(),
});
const todayEndDate = add(todayStartDate, { hours: 24, seconds: -1 });

export { todayEndDate, todayStartDate };
