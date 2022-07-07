import { hoursToMinutes } from "date-fns";

export function bankBalanceHours(
  totalMinutes: number,
  status: string,
  balanceBank: string
) {
  const [hour, minutes] = balanceBank.split(":");
  const transormHoursToMinutes = hoursToMinutes(Number(hour)) + Number(minutes);

  const getMinutesBonus = Math.abs(totalMinutes - 480);

  const someMinutesBankWithMinutesBonus =
    String(status) === "DOWN"
      ? transormHoursToMinutes - getMinutesBonus
      : String(status) === "UP"
      ? transormHoursToMinutes + getMinutesBonus
      : String(status) === "EQUAL" && transormHoursToMinutes;

  const verifyMinutesPositiveOrNegative = Math.sign(
    someMinutesBankWithMinutesBonus
  );

  const timeHorBankBalance = String(
    Math.floor(Math.abs(someMinutesBankWithMinutesBonus) / 60)
  ).padStart(2, "0");

  const timeMinutesBankBalance = String(
    Math.abs(someMinutesBankWithMinutesBonus) % 60
  ).padStart(2, "0");

  const timeValue = `${
    verifyMinutesPositiveOrNegative === -1 ? "-" : ""
  }${timeHorBankBalance}:${timeMinutesBankBalance}`;

  return {
    time: timeValue,
    verifyMinutesPositiveOrNegative,
    date: new Date().toISOString(),
  };
}
