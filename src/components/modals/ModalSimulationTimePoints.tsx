import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  FormControl,
  HStack,
  VStack,
  FormLabel,
  Flex,
  Grid,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { dateTimeProps } from "../../contexts/TimeContext";
import { format } from "date-fns";

import pt from "date-fns/locale/pt";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  data: dateTimeProps | null;
}

export function ModalSimulationTimePoints({
  isOpen,
  onClose,
  data,
}: ModalComponentProps) {
  const totalTimeMinutes = 480;

  const date = data?.createdAt;
  const upTime = data?.objTotalTimeWork.totalMinutes > totalTimeMinutes;
  const equalTime = data?.objTotalTimeWork.totalMinutes === totalTimeMinutes;
  const downTime = data?.objTotalTimeWork.totalMinutes < totalTimeMinutes;
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="#c3c3c3">
          <ModalHeader>
            {date &&
              format(date, `'Dia' dd 'de' MMMM`, {
                locale: pt,
              })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid gridTemplateColumns="1fr 1fr">
              <Text>
                Entrada 1:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {data?.entryOne}
                </span>
              </Text>

              <Text>
                Saída 1:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {data?.exitOne}
                </span>
              </Text>

              <Text>
                Entrada 2:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {data?.entryTwo}
                </span>
              </Text>
              <Text>
                Saída 2:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {data?.exitTwo}
                </span>
              </Text>
            </Grid>
            <Heading fontSize="20px" margin="12px 0">
              Tempo de horários
            </Heading>
            <Text>Manhã: {data?.timeMorning}</Text>
            <Text>Almoço: {data?.timeLunch}</Text>
            <Text>Tarde: {data?.timeAfternoon}</Text>

            {upTime && (
              <VStack display="flex" justifyContent="flex-start">
                <Heading
                  color="green.600"
                  margin="12px 0"
                  gap="8px"
                  fontSize="26px"
                  display="flex"
                >
                  Tempo ganhos
                  <AiFillCheckCircle />
                </Heading>
                <Text w="full" padding="0 12px" fontSize="28px">
                  {data.objTotalTimeWork.totalMinutes - totalTimeMinutes}{" "}
                  Minutos
                </Text>
              </VStack>
            )}
            {equalTime && (
              <Heading margin="12px 0" gap="8px" fontSize="26px" display="flex">
                {" "}
                In Time <AiOutlineClockCircle />
              </Heading>
            )}
            {downTime && (
              <VStack display="flex" justifyContent="flex-start">
                <Heading
                  color="red.600"
                  margin="12px 0"
                  gap="8px"
                  fontSize="26px"
                  display="flex"
                >
                  Tempo restantes que faltou
                  <AiFillCloseCircle />
                </Heading>
                <Text w="full" padding="0 12px" fontSize="28px">
                  {totalTimeMinutes - data?.objTotalTimeWork?.totalMinutes}{" "}
                  Minutos
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
