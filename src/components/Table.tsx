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

import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";

export function TableComponent() {
  return (
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
            <Tr borderBottom="1px solid #fff" borderColor="whiteAlpha.400">
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
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
