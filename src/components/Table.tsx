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

import { AiOutlineClockCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import { useContext } from "react";
import { dateTimeProps, TimeContext } from "../contexts/TimeContext";
interface TableDataProps {
  handleShowInfoTime: (item: dateTimeProps) => void;
  handleDeletePoint: (id: string) => void;
}

export function TableComponent({
  handleShowInfoTime,
  handleDeletePoint,
}: TableDataProps) {
  const { dateTime } = useContext(TimeContext);

  return (
    <>
      <Box
        borderRadius="12px"
        background="blackAlpha.300"
        height="100%"
        overflowY="scroll"
        padding="0 32px"
      >
        <TableContainer color="#fff">
          <Table variant="unstyled" size="sm">
            <Thead>
              <Tr color="white">
                <Th>Data</Th>
                <Th>Entrada 1</Th>
                <Th>Saida 1</Th>
                <Th>Entrada 2</Th>
                <Th>Saida 2</Th>
                <Th>Bonus</Th>
                <Th fontSize="1xl"></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {dateTime?.map((item, idx) => {
                const itemSelectedDate = format(
                  new Date(item.selectedDate),
                  `dd 'de' MMM - (eee)`,
                  {
                    locale: pt,
                  }
                );
                return (
                  <Tr
                    key={item.id}
                    color={
                      (item.definedStatus === "UP" && "green.400") ||
                      (item.definedStatus === "DOWN" && "red.400")
                    }
                  >
                    <Td>{itemSelectedDate}</Td>
                    <Td>{item.entryOne}</Td>
                    <Td>{item.exitOne}</Td>
                    <Td>{item.entryTwo}</Td>
                    <Td>{item.exitTwo}</Td>
                    <Td display="flex" alignItems="center" gap="8px">
                      {" "}
                      {item.definedStatus === "down" ? (
                        "- "
                      ) : (
                        <AiOutlineClockCircle fontSize="18px" />
                      )}
                      {`${item.hoursReminder}:${item.minutesReminder}`}
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <FaEdit
                          cursor="pointer"
                          onClick={() => handleShowInfoTime(item)}
                          color="yellow"
                        />
                        <MdDeleteOutline
                          cursor="pointer"
                          onClick={() => handleDeletePoint(item.id)}
                          color="red"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
