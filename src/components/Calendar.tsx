import { useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt";

export function CalendarDatePicker() {
  const [selected, setSelected] = useState(new Date());

  console.log("selected", selected);
  let footer = <p>Pick a day</p>;
  if (selected) {
    footer = (
      <p>
        Picked{" "}
        {format(selected, "PP", {
          locale: ptBr,
        })}
      </p>
    );
  }

  //   const disabledDays = useMemo(() => {
  //     const dates = monthAvailability
  //       .filter(monthDay => monthDay.available === false)
  //       .map(monthDay => {
  //         const year = currentMonth.getFullYear();
  //         const month = currentMonth.getMonth();

  //         return new Date(year, month, monthDay.day);
  //       });

  //       return dates;
  //   }, [currentMonth, monthAvailability]);
  const disabledDays = [
    new Date(2022, 4, 10),
    new Date(2022, 4, 12),
    new Date(2022, 4, 20),
    // { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) }
  ];
  return (
    <DayPicker
    
      defaultMonth={new Date(2022, 5, 10)}
      mode="single"
      locale={ptBr}
      disabled={[
        // { before: new Date() },
        { dayOfWeek: [0, 6] },
        ...disabledDays,
      ]}
      modifiers={{
        available: { dayOfWeek: [1, 2, 3, 4, 5] },
      }}
      selected={selected}
      onSelect={setSelected}
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
  );
}
