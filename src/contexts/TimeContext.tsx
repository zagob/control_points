import { format } from "date-fns";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { useQuery } from "react-query";
import { queryClient } from "../services/queryClient";

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

interface SetDateTimeProps {
  totalPage: number;
  listDateMonth: dateTimeProps[];
}

interface TimeContextProps {
  dateTime: dateTimeProps[] | null;
  // setDateTime: Dispatch<SetStateAction<dateTimeProps[]>>;
  setDateTime: Dispatch<SetStateAction<SetDateTimeProps>>;
  dateTimeObject: dateTimeProps | null;
  setDateTimeObject: Dispatch<SetStateAction<dateTimeProps>>;
  setMonthSelected: Dispatch<SetStateAction<number>>;
  monthSelected: number;
  loadingPoint: (data: dateTimeProps[]) => void;
}

export const TimeContext = createContext({} as TimeContextProps);

export function TimeProvider({ children }: TimeProviderProps) {
  const { user } = useAuth();
  console.log("userrr", user);
  const [dateTime, setDateTime] = useState<dateTimeProps[] | null>(null);
  const [dateTimeObject, setDateTimeObject] = useState<dateTimeProps | null>(
    null
  );
  const [monthSelected, setMonthSelected] = useState(
    Number(format(new Date(), "M"))
  );
  // const { data, isFetching, error } = useQuery("data", async () => {
  //   console.log('u', user)
  //   const response = await api.get(
  //     `/points/list/${user?.id}?year=2022&month=5`
  //   );

  //   console.log("responseee", response);
  //   return response.data;
  // }, {
  //   staleTime: 1000 * 60
  // });

  function loadingPoint(data: dateTimeProps[]) {
    // const year = new Date().getFullYear();

    // console.log(year);

    // const res = await api.get(
    //   `/points/list/${user?.id}?year=${year}&month=${monthSelected}`
    // );

    // console.log("ress", res);
    // queryClient.refetchQueries()
    setDateTime(data);
  }

  useEffect(() => {
    setDateTime([]);
  }, []);

  return (
    <TimeContext.Provider
      value={{
        dateTime,
        setDateTime,
        dateTimeObject,
        setDateTimeObject,
        monthSelected,
        setMonthSelected,
        loadingPoint,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}
