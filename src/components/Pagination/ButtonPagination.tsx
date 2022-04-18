import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonPaginationProps extends ButtonProps {
  children: ReactNode;
}

export function ButtonPagination({ children, ...rest }: ButtonPaginationProps) {
  return <Button padding="0" {...rest}>{children}</Button>;
}
