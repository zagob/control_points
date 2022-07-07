import { Input, InputProps } from "@chakra-ui/react";

export function InputTime({ ...rest }: InputProps) {
  return (
    <Input
      type="time"
      color="whiteAlpha.800"
      background="whiteAlpha.300"
      borderColor="#15616d"
      fontSize="20px"
      width="120px"
      _hover={{ background: "rgba(0, 0, 0, 0)" }}
      {...rest}
    />
  );
}
