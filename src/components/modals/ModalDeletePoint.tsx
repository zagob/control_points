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
  Flex,
  Button,
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
  data: string | undefined;
  onDeletePoint: (id: string) => void;
}

export function ModalDeletePoint({ isOpen, onClose, data, onDeletePoint }: ModalComponentProps) {
  const { dateTimeObject } = useContext(TimeContext);
  const totalTimeMinutes = 480;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="#c3c3c3">
          <ModalCloseButton onClick={() => onClose()} />
          <ModalBody>
            <VStack spacing="4">
              <Heading fontSize="1xl">
                Deseja realmente excluir esse horário?
              </Heading>

              <Flex gap="4">
                <Button bg="green.400" onClick={() => onDeletePoint(data)}>Sim</Button>
                <Button bg="red.400" onClick={() => onClose()}>Não</Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
