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
} from "@chakra-ui/react";
import { InputTime } from "./InputTime";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalComponent({ isOpen, onClose }: ModalComponentProps) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="#c3c3c3">
          <ModalHeader>Dia 05 de Abril de 2022</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Grid gridTemplateColumns="1fr 1fr">
                  <FormLabel>Entrada 1: 09:30</FormLabel>
                  <FormLabel>Saída 1: 12:30</FormLabel>
                  <FormLabel>Entrada 2: 14:00</FormLabel>
                  <FormLabel>Saída 2: 19:00</FormLabel>
              </Grid>
              <Heading fontSize="20px">Tempo de</Heading>
              <Text>Manhã</Text>
              <Text>Almoço</Text>
              <Text>Tarde</Text>
            {/* <VStack>
              <HStack w="300px" display="flex">
                <InputTime color="#000" />
                <InputTime color="#000" />
              </HStack>
              <HStack w="300px" display="flex">
                <InputTime color="#000" />
                <InputTime color="#000" />
              </HStack>
              <Button width="full">Simular</Button>
            </VStack> */}
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
