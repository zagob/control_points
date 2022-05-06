import { Input } from "@chakra-ui/react";

export function DateTime() {
  const data = new Date();
  const format = `${data.getFullYear()}-${String(data.getDay()).padStart(
    2,
    "0"
  )}-${String(data.getMonth()).padStart(2, "0")}`;
  console.log(
    `${data.getFullYear()}-${String(data.getDay()).padStart(2, "0")}-${String(
      data.getMonth()
    ).padStart(2, "0")}`
  );
  return (
    <Input
      type="month"
      // value="2022-03-03"
      color="#fff"
      width="min-content"
    />
  );
}
