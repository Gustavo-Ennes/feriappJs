const checkType = (type: string): boolean =>
  type === "dayOff" || type === "vacation" || type === "license";

const checkDaysQtd = ({
  daysQtd,
  type,
}: {
  daysQtd: number;
  type: string;
}): boolean => {
  if (type === "dayOff") return daysQtd === 1;
  else if (type === "vacation") return daysQtd === 15 || daysQtd === 30;
  else if (type === "license")
    return (
      daysQtd === 15 ||
      daysQtd === 30 ||
      daysQtd === 45 ||
      daysQtd === 60 ||
      daysQtd === 75 ||
      daysQtd === 90
    );
  else return false;
};

export { checkType, checkDaysQtd };
