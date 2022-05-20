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
  data: dateTimeProps[];
  handleShowInfoTime: (item: dateTimeProps) => void;
  handleDeletePoint: (id: string) => void;
}

export function TableComponent({ data, handleShowInfoTime, handleDeletePoint }: TableDataProps) {
  const { dateTime } = useContext(TimeContext);

  return (
    <>
      <Box borderRadius="12px" background="blackAlpha.300">
        <Text>sd</Text>
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
