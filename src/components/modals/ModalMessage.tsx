import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { TimeContext } from "../../contexts/TimeContext";

import { useContext } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalMessage({
  isOpen,
  onClose,
}: ModalComponentProps) {
  const { dateTimeObject } = useContext(TimeContext);
  const totalTimeMinutes = 480;

  console.log("dateTimeObject", dateTimeObject);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="#c3c3c3">
         
          <ModalCloseButton />
          <ModalBody>
            <Text>Já existe uma mesma data cadastrada</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
