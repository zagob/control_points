import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Grid,
  Heading,
  ModalHeader,
} from "@chakra-ui/react";
import { TimeContext } from "../../contexts/TimeContext";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { useContext } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalSimulationTimePoints({
  isOpen,
  onClose,
}: ModalComponentProps) {
  const { dateTimeObject } = useContext(TimeContext);
  const totalTimeMinutes = 480;

  console.log('dateTimeObject',dateTimeObject)

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="#c3c3c3">
          <ModalHeader>
            {dateTimeObject !== null &&
              format(
                new Date(dateTimeObject?.selectedDate),
                `'Dia' dd 'de' MMMM - (eeee)`,
                {
                  locale: pt,
                }
              )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid gridTemplateColumns="1fr 1fr">
              <Text>
                Entrada 1:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {dateTimeObject?.entryOne}
                </span>
              </Text>

              <Text>
                Saída 1:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {dateTimeObject?.exitOne}
                </span>
              </Text>

              <Text>
                Entrada 2:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {dateTimeObject?.entryTwo}
                </span>
              </Text>
              <Text>
                Saída 2:{" "}
                <span style={{ color: "green", fontWeight: "700" }}>
                  {dateTimeObject?.exitTwo}
                </span>
              </Text>
            </Grid>
            <Heading fontSize="20px" margin="12px 0">
              Tempo de horários
            </Heading>
            <Text>Manhã (trabalho): {dateTimeObject?.timeMorning}</Text>
            <Text>Almoço (pausa): {dateTimeObject?.timeLunch}</Text>
            <Text>Tarde (trabalho): {dateTimeObject?.timeAfternoon}</Text>

            {dateTimeObject?.definedStatus === "UP" && (
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
                  {dateTimeObject.totalMinutes - totalTimeMinutes} Minutos
                </Text>
              </VStack>
            )}
            {dateTimeObject?.definedStatus === "EQUAL" && (
              <Heading margin="12px 0" gap="8px" fontSize="26px" display="flex">
                {" "}
                In Time <AiOutlineClockCircle />
              </Heading>
            )}
            {dateTimeObject?.definedStatus === "DOWN" && (
              <VStack display="flex" justifyContent="flex-start">
                <Heading
                  color="red.600"
                  margin="12px 0"
                  gap="8px"
                  fontSize="26px"
                  display="flex"
                >
                  Tempo restantes
                  <AiFillCloseCircle />
                </Heading>
                <Text w="full" padding="0 12px" fontSize="28px">
                  {totalTimeMinutes - dateTimeObject?.totalMinutes} Minutos
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
