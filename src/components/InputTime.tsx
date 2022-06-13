import { Input, InputProps } from "@chakra-ui/react";
import InputMask from "react-input-mask";

export function InputTime({ ...rest }: InputProps) {
  return (
    <Input
      // as={InputMask}
      // mask="99:99"
      // maskChar={null}
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
