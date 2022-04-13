import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { Pagination } from "./Pagination";
import { PaginationHook } from "./PaginationHook";
import { useState } from "react";

interface valuesDatePros {
  totalMinutes: number;
  totalHours: number;
  reminderMinutes: string;
}

interface dateTimeProps {
  createdAt: {
    seconds: number;
  };
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  objTotalTimeWork: valuesDatePros | null;
  timeMorning: string;
  timeLunch: string;
  timeAfternoon: string;
  stringTotalTime: string;
  timeBonus: {
    valueHoursReminder: string;
    valueMinutesReminder: string;
    definedStatus: string;
  };
}
interface TableDataProps {
  data: dateTimeProps[];
}

export function TableComponent({ data }: TableDataProps) {
  const dataFormat = data.map((item) => {
    return {
      ...item,
      createdAt: new Date(item.createdAt.seconds * 1000),
    };
  });

  const formatDateFnsDate = dataFormat.map((item) => {
    return {
      ...item,
      createdAt: format(item.createdAt, `dd 'de' MMM`, {
        locale: pt,
      }),
    };
  });

  return (
    <>
      <Box borderRadius="12px" background="blackAlpha.300">
        <TableContainer color="#fff">
          <Table variant="unstyled">
            <Thead>
              <Tr color="white">
                <Th fontSize="1xl">Data</Th>
                <Th fontSize="1xl">Entrada 1</Th>
                <Th fontSize="1xl">Saida 1</Th>
                <Th fontSize="1xl">Entrada 2</Th>
                <Th fontSize="1xl">Saida 2</Th>
                <Th fontSize="1xl">Bonus</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {formatDateFnsDate.map((item, idx) => (
                <Tr
                  key={idx}
                  color={
                    (item.timeBonus.definedStatus === "up" && "green.400") ||
                    (item.timeBonus.definedStatus === "down" && "red.400")
                  }
                >
                  <Td>{item.createdAt}</Td>
                  <Td>{item.entryOne}</Td>
                  <Td>{item.exitOne}</Td>
                  <Td>{item.entryTwo}</Td>
                  <Td>{item.exitTwo}</Td>
                  <Td display="flex" alignItems="center" gap="8px">
                    {" "}
                    {item.timeBonus.definedStatus === "down" ? (
                      "- "
                    ) : (
                      <AiOutlineClockCircle fontSize="18px" />
                    )}
                    {`${item.timeBonus.valueHoursReminder}:${item.timeBonus.valueMinutesReminder}`}
                  </Td>
                </Tr>
              ))}
              {/* <Tr borderBottom="1px solid #fff" borderColor="whiteAlpha.400">
              <Td>04 Abr 2022</Td>
              <Td>09:30</Td>
              <Td>12:30</Td>
              <Td>14:00</Td>
              <Td>19:00</Td>
              <Td display="flex" alignItems="center" gap="8px">
                {" "}
                <AiOutlineClockCircle fontSize="18px" /> 00:00
              </Td>
            </Tr>
            <Tr
              color="red.400"
              borderBottom="1px solid #fff"
              borderColor="whiteAlpha.400"
            >
              <Td>05 Abr 2022</Td>
              <Td>09:30</Td>
              <Td>12:30</Td>
              <Td>14:00</Td>
              <Td>19:00</Td>
              <Td display="flex" alignItems="center" gap="8px">
                <RiSubtractFill color="red.400" fontSize="18px" /> 00:00
              </Td>
            </Tr>
            <Tr
              color="green.400"
              borderBottom="1px solid #fff"
              borderColor="whiteAlpha.400"
            >
              <Td>06 Abr 2022</Td>
              <Td>09:30</Td>
              <Td>12:30</Td>
              <Td>14:00</Td>
              <Td>19:00</Td>
              <Td display="flex" alignItems="center" gap="8px">
                <IoIosAdd color="green.400" fontSize="18px" />
                00:00
              </Td>
            </Tr> */}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex>
        
      </Flex>
    </>
  );
}
