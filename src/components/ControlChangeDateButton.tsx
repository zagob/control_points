import { ButtonGroup, Flex, IconButton, Button } from "@chakra-ui/react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { formatMonthDateFns } from "../utils/formatDate";

interface ControlChangeDateButton {
  disabledFirstMonth: boolean;
  disabledEndMonth: boolean;
  monthSelected: number;
  yearSelected: number;
  onHandleBackMonth: () => void;
  onHandleNextMonth: () => void;
  onHandleBackYear: () => void;
  onHandleNextYear: () => void;
}

export function ControlChangeDateButton({
  disabledFirstMonth,
  disabledEndMonth,
  monthSelected,
  yearSelected,
  onHandleBackMonth,
  onHandleNextMonth,
  onHandleBackYear,
  onHandleNextYear,
}: ControlChangeDateButton) {
  return (
    <Flex gap="2">
      <ButtonGroup size="sm" isAttached variant="solid">
        <IconButton
          size="sm"
          disabled={disabledFirstMonth}
          aria-label="back month"
          icon={<BsFillArrowLeftCircleFill />}
          onClick={onHandleBackMonth}
        />
        <Button
          size="sm"
          w="20"
          _hover={{ cursor: "not-allowed" }}
          background="#fff"
        >
          {formatMonthDateFns(monthSelected)}
        </Button>
        <IconButton
          disabled={disabledEndMonth}
          aria-label="next month"
          size="sm"
          icon={<BsFillArrowRightCircleFill />}
          onClick={onHandleNextMonth}
        />
      </ButtonGroup>

      <ButtonGroup size="sm" isAttached variant="solid">
        <IconButton
          size="sm"
          aria-label="year month"
          icon={<BsFillArrowLeftCircleFill />}
          onClick={onHandleBackYear}
        />
        <Button size="sm" _hover={{ cursor: "not-allowed" }} background="#fff">
          {yearSelected}
        </Button>
        <IconButton
          aria-label="year month"
          size="sm"
          icon={<BsFillArrowRightCircleFill />}
          onClick={onHandleNextYear}
        />
      </ButtonGroup>
    </Flex>
  );
}
