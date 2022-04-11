import { Input, InputProps } from "@chakra-ui/react";

export function InputTime({ ...rest }: InputProps) {
  return (
    <Input
      color="whiteAlpha.800"
      background="whiteAlpha.300"
      borderColor="#15616d"
      fontSize="22px"
      type="time"
      {...rest}
    />
  );
}
