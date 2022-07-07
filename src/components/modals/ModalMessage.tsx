import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalMessage({ isOpen, onClose }: ModalComponentProps) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay /> */}
        <ModalContent background="#c3c3c3">
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text>Já existe uma mesma data cadastrada</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
