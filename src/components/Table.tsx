import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { AiOutlineClockCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";

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

export interface dateTimeFormatProps {
  createdAt: string;
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
  handleShowInfoTime: (item: dateTimeFormatProps) => void;
}

export function TableComponent({ data, handleShowInfoTime }: TableDataProps) {
  const dataFormat = data.map((item) => {
    return {
      ...item,
      createdAt: new Date(item.createdAt.seconds * 1000),
    };
  });

  console.log('format', dataFormat)

  const formatDateFnsDate = dataFormat.map((item) => {
    return {
      ...item,
      createdAt: format(item.createdAt, `dd 'de' MMM`, {
        locale: pt,
      }),
    };
  });
  console.log('DATA', data);

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
                <Th fontSize="1xl"></Th>
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
                  <Td>
                    <FaEdit
                      cursor="pointer"
                      onClick={() => handleShowInfoTime(item)}
                      color="yellow"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
