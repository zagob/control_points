import { format } from "date-fns";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { useAuth } from "../hooks/useAuth";

export interface dateTimeProps {
  id: string;
  definedStatus: string;
  entryOne: string;
  entryTwo: string;
  exitOne: string;
  exitTwo: string;
  hoursReminder: string;
  minutesReminder: string;
  selectedDate: Date;
  timeAfternoon: string;
  timeLunch: string;
  timeMorning: string;
  totalHours: number;
  totalMinutes: number;
  userId: string;
}

interface TimeProviderProps {
  children: ReactNode;
}


interface TimeContextProps {
  dateTime: dateTimeProps[] | null;
  setDateTime: Dispatch<SetStateAction<dateTimeProps[]>>;
  dateTimeObject: dateTimeProps | null;
  setDateTimeObject: Dispatch<SetStateAction<dateTimeProps>>;
  setMonthSelected: Dispatch<SetStateAction<number>>;
  monthSelected: number;
  setYearSelected: Dispatch<SetStateAction<number>>;
  yearSelected: number;
}

export const TimeContext = createContext({} as TimeContextProps);

export function TimeProvider({ children }: TimeProviderProps) {
  const { user } = useAuth();

  const [dateTime, setDateTime] = useState<dateTimeProps[] | null>();
  const [dateTimeObject, setDateTimeObject] = useState<dateTimeProps | null>(
    null
  );
  const [monthSelected, setMonthSelected] = useState(
    Number(format(new Date(), "M"))
  );
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  return (
    <TimeContext.Provider
      value={{
        dateTime,
        setDateTime,
        dateTimeObject,
        setDateTimeObject,
        monthSelected,
        setMonthSelected,
        yearSelected,
        setYearSelected,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}
