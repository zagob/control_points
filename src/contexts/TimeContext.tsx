import { createContext, ReactNode, useState } from "react";
import { format, parseISO, differenceInMinutes } from "date-fns";

interface valuesDatePros {
  totalMinutes: number;
  totalHours: number;
  reminderMinutes: string;
}

interface dateTimeProps {
  returnObjEntryAndExitLunch: valuesDatePros;
  returnObjExitLunchAndBackLunch: valuesDatePros;
  returnObjEntryAndExit: valuesDatePros;
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
  ) => void;
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
    entry: string,
    exitLunch: string,
    backLunch: string,
    exit: string
  ) {
    const entryDate = parseISO(`${newDate} ${entry}`);
    const exitLunchDate = parseISO(`${newDate} ${exitLunch}`);
    const backLunchDate = parseISO(`${newDate} ${backLunch}`);
    const exitDate = parseISO(`${newDate} ${exit}`);

    const returnObjEntryAndExitLunch = convertDataTime(
      entryDate,
      exitLunchDate
    );
    const returnObjExitLunchAndBackLunch = convertDataTime(
      exitLunchDate,
      backLunchDate
    );
    const returnObjEntryAndExit = convertDataTime(backLunchDate, exitDate);

    console.log(
      "Tempo de entrada e saida para almoco",
      convertTimeToString(returnObjEntryAndExitLunch)
    );
    console.log(
      "Tempo de almoco",
      convertTimeToString(returnObjExitLunchAndBackLunch)
    );
    console.log(
      "Tempo de volta do almoco e saida",
      convertTimeToString(returnObjEntryAndExit)
    );
    const returnObjTotalTimeWork = convertTotalTimeWork(
      returnObjEntryAndExitLunch,
      returnObjEntryAndExit
    );

    console.log("Tempo total de trabalho", convertTimeToString(returnObjTotalTimeWork));

    setDateTime({
      returnObjEntryAndExitLunch,
      returnObjExitLunchAndBackLunch,
      returnObjEntryAndExit,
    });
  }

  return (
    <TimeContext.Provider
      value={{ newDate, handleCalculateHoursPoint, dateTime }}
    >
      {children}
    </TimeContext.Provider>
  );
}
