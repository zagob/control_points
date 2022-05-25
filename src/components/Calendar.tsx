import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import ptBr from "date-fns/locale/pt";
import { TimeContext } from "../contexts/TimeContext";
import { queryClient } from "../services/queryClient";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface CalendarDayPicker {
  onSelectedDate: Dispatch<SetStateAction<Date>>;
  selectedDate: Date;
}

export function CalendarDatePicker({
  onSelectedDate,
  selectedDate,
}: CalendarDayPicker) {
  const { user } = useAuth();
  const { dateTime, monthSelected, setMonthSelected } = useContext(TimeContext);
  const [disabledDays, setDisabledDays] = useState([]);

  useEffect(() => {
    async function getMonthDate() {
      const response = await api.get(
        `/points/getDate/${user.id}?year=2022&month=${monthSelected}`
      );

      const newDateFormat = response.data.map((item) => new Date(item));

      setDisabledDays(newDateFormat);
    }

    getMonthDate();
  }, [monthSelected]);

  // const disabledDays = dateTime?.listDateMonth.map(
  //   (item) => new Date(item.selectedDate)
  // );

  // const disabledDays = [
  //   new Date(2022, 4, 10),
  //   new Date(2022, 4, 12),
  //   new Date(2022, 4, 20),
  //   // { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) }
  // ];

  function handleChangeMonth(event: Date) {
    setMonthSelected(event.getMonth() + 1);
    queryClient.removeQueries();
    queryClient.refetchQueries();
  }

  return (
    <>
      <DayPicker
        mode="single"
        month={new Date(2022, monthSelected - 1)}
        onMonthChange={(event) => handleChangeMonth(event)}
        locale={ptBr}
        disabled={[{ dayOfWeek: [0, 6] }, ...disabledDays]}
        modifiers={{
          available: { dayOfWeek: [1, 2, 3, 4, 5] },
        }}
        selected={selectedDate}
        onSelect={onSelectedDate}
        modifiersStyles={{
          selected: {
            background: "#fff",
            color: "#000",
          },
          today: {
            color: "red",
          },
          range_end: {
            color: "#000",
            background: "none",
          },
        }}
        style={{
          color: "#fff",
        }}
      />
    </>
  );
}
