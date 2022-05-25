import { format } from "date-fns";
import pt from "date-fns/locale/pt";

export function formatMonthDateFns(month: number) {
  return format(new Date(new Date().getFullYear(), month - 1), "MMMM", {
    locale: pt,
  });
}

export function formatYearDateFns(month: number, year: number) {
  return format(new Date(new Date().getFullYear(), month - 1), "yyy", {
    locale: pt,
  });
}
