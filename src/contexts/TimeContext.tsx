import { createContext, ReactNode, useState } from "react";
import { format, parseISO, differenceInMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface valuesDatePros {
  totalMinutes: number;
  totalHours: number;
  reminderMinutes: string;
}

export interface dateTimeProps {
  id: string;
  createdAt: Date;
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  objTotalTimeWork: valuesDatePros | null;
  timeMorning: string;
  timeLunch: string;
  timeAfternoon: string;
  stringTotalTime: string;
  timeBonus: {
    valueHoursReminder: string;
    valueMinutesReminder: string;
    definedStatus: string;
  };
}

interface TimeProviderProps {
  children: ReactNode;
}

interface TimeContextProps {
  newDate: string;
  handleCalculateHoursPoint: (
    entry: string,
    exitLunch: string,
    backLunch: string,
    exit: string
  ) => dateTimeProps;
  dateTime: dateTimeProps | undefined;
}

export const TimeContext = createContext({} as TimeContextProps);

export function TimeProvider({ children }: TimeProviderProps) {
  const [dateTime, setDateTime] = useState<dateTimeProps>();
  const newDate = format(new Date(), "yyyy-MM-dd");

  function convertDataTime(dateLeft: Date, dateRight: Date) {
    const totalMinutes = differenceInMinutes(dateRight, dateLeft);

    const totalHours = Math.floor(totalMinutes / 60);

    const reminderMinutes = String(totalMinutes % 60).padStart(2, "0");

    return {
      totalMinutes,
      totalHours,
      reminderMinutes,
    };
  }

  function convertTimeToString(date: valuesDatePros) {
    return `${date.totalHours} hora(s) e ${date.reminderMinutes} minutos`;
  }

  function convertTotalTimeWork(
    timeMorning: valuesDatePros,
    timeAfternoon: valuesDatePros
  ) {
    const totalTimeMinutosMorningAndAfternoon =
      timeMorning.totalMinutes + timeAfternoon.totalMinutes;

    const totalHours = Math.floor(totalTimeMinutosMorningAndAfternoon / 60);

    const reminderMinutes = String(
      totalTimeMinutosMorningAndAfternoon % 60
    ).padStart(2, "0");

    return {
      totalMinutes: totalTimeMinutosMorningAndAfternoon,
      totalHours,
      reminderMinutes,
    };
  }

  function handleCalculateHoursPoint(
    entryOne: string,
    exitOne: string,
    entryTwo: string,
    exitTwo: string
  ) {
    const totalTimeMinutes = 480; // 8 horas
    const entryDate = parseISO(`${newDate} ${entryOne}`);
    const exitLunchDate = parseISO(`${newDate} ${exitOne}`);
    const backLunchDate = parseISO(`${newDate} ${entryTwo}`);
    const exitDate = parseISO(`${newDate} ${exitTwo}`);

    const returnObjEntryAndExitLunch = convertDataTime(
      entryDate,
      exitLunchDate
    );

    const returnObjExitLunchAndBackLunch = convertDataTime(
      exitLunchDate,
      backLunchDate
    );

    const returnObjEntryAndExit = convertDataTime(backLunchDate, exitDate);

    const timeMorning = convertTimeToString(returnObjEntryAndExitLunch);
    const timeLunch = convertTimeToString(returnObjExitLunchAndBackLunch);
    const timeAfternoon = convertTimeToString(returnObjEntryAndExit);

    const objTotalTimeWork = convertTotalTimeWork(
      returnObjEntryAndExitLunch,
      returnObjEntryAndExit
    );

    const stringTotalTime = convertTimeToString(objTotalTimeWork);

    const subtractTotalMinutes =
      objTotalTimeWork.totalMinutes - totalTimeMinutes;

    const convertToPositive = Math.abs(subtractTotalMinutes);
    const valueHoursReminder = String(
      Math.floor(convertToPositive / 60)
    ).padStart(2, "0");
    const valueMinutesReminder = String(convertToPositive % 60).padStart(
      2,
      "0"
    );

    const definedStatus = Math.sign(subtractTotalMinutes); // 1, 0, - 1

    const timeBonus = {
      valueHoursReminder,
      valueMinutesReminder,
      definedStatus:
        (definedStatus === 1 && "up") ||
        (definedStatus === 0 && "equal") ||
        (definedStatus === -1 && "down"),
    };

    const dateNow = new Date();

    const returnObj = {
      id: uuidv4(),
      createdAt: dateNow,
      entryOne,
      exitOne,
      entryTwo,
      exitTwo,
      objTotalTimeWork,
      timeMorning,
      timeLunch,
      timeAfternoon,
      stringTotalTime,
      timeBonus,
    };

    setDateTime(returnObj);
    return returnObj;
  }

  return (
    <TimeContext.Provider
      value={{ newDate, handleCalculateHoursPoint, dateTime }}
    >
      {children}
    </TimeContext.Provider>
  );
}
