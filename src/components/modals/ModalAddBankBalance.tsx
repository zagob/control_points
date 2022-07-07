import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  FormControl,
  Input,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Button,
  Flex,
} from "@chakra-ui/react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  valueHour: string;
  valueMinute: string;
  onChangeValueStatus: (value: number) => void;
  onChangeValueHour: (value: string) => void;
  onChangeValueMinute: (value: string) => void;
  onSendBankBalance: () => void;
}

export function ModalAddBankBalance({
  isOpen,
  onClose,
  valueHour,
  valueMinute,
  onChangeValueStatus,
  onChangeValueHour,
  onChangeValueMinute,
  onSendBankBalance,
}: ModalComponentProps) {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FormControl bg="white">
              <FormLabel as="legend">Valor do saldo de horas: </FormLabel>
              <Flex justifyContent="flex-start" alignItems="center">
                <FormControl w="180px">
                  <FormLabel as="legend">Horas: </FormLabel>
                  <Input
                    type="text"
                    w="28"
                    color="white"
                    bg="blue.900"
                    defaultValue={valueHour}
                    onChange={(e) => onChangeValueHour(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel as="legend">Minutos: </FormLabel>
                  <Input
                    type="text"
                    w="28"
                    color="white"
                    bg="blue.900"
                    maxLength={2}
                    defaultValue={valueMinute}
                    onChange={(e) => onChangeValueMinute(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Status das horas: </FormLabel>
              <RadioGroup
                defaultValue="status"
                onChange={(value) => onChangeValueStatus(Number(value))}
              >
                <HStack spacing="24px">
                  <Radio
                    outline="1px solid black"
                    _focus={{ bg: "#000" }}
                    value={1}
                  >
                    Positivo
                  </Radio>
                  <Radio
                    outline="1px solid black"
                    _focus={{ bg: "#000" }}
                    value={-1}
                  >
                    Negativo
                  </Radio>
                  <Radio
                    outline="1px solid black"
                    _focus={{ bg: "#000" }}
                    value={0}
                  >
                    Igual
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button
              bg="#000"
              color="#fff"
              onClick={() => {
                onSendBankBalance(), onClose();
              }}
            >
              Enviar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
