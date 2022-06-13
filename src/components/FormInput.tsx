import { Button, Flex, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { Dispatch, SetStateAction } from "react";
import { InputTime } from "./InputTime";

interface FormInputParams {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  setEntryOne: Dispatch<SetStateAction<string>>;
  setExitOne: Dispatch<SetStateAction<string>>;
  setEntryTwo: Dispatch<SetStateAction<string>>;
  setExitTwo: Dispatch<SetStateAction<string>>;
  timeAdded: boolean;
  handleSendValues: (isSmiluation?: boolean) => Promise<void>;
  selected: Date;
}

export function FormInput({
  entryOne,
  entryTwo,
  exitOne,
  exitTwo,
  setEntryOne,
  setEntryTwo,
  setExitOne,
  setExitTwo,
  timeAdded,
  handleSendValues,
  selected,
}: FormInputParams) {
  return (
    <VStack spacing={5} margin="auto 0">
      <Flex gap="3">
        <VStack spacing={10}>
          <FormControl>
            <FormLabel color="#fff">Entrada 1</FormLabel>
            <InputTime
              as={InputMask}
              value={entryOne}
              onChange={(e) => setEntryOne(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#fff">Entrada 2</FormLabel>
            <InputTime
              value={entryTwo}
              onChange={(e) => setEntryTwo(e.target.value)}
            />
          </FormControl>
        </VStack>
        <VStack spacing={10}>
          <FormControl>
            <FormLabel color="#fff">Saída 1</FormLabel>
            <InputTime
              value={exitOne}
              onChange={(e) => setExitOne(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#fff">Saída 2</FormLabel>
            <InputTime
              value={exitTwo}
              onChange={(e) => setExitTwo(e.target.value)}
            />
          </FormControl>
        </VStack>
      </Flex>
      <Flex gap="10px" w="full">
        <>
          <Button
            w="full"
            background="#ffd373"
            onClick={() => handleSendValues()}
            disabled={
              entryOne.length === 0 ||
              entryTwo.length === 0 ||
              exitOne.length === 0 ||
              exitTwo.length === 0 ||
              !selected
            }
            _hover={{
              _disabled: {},
              _active: { background: "#ffd373" },
              opacity: "0.4",
            }}
          >
            Adicionar
          </Button>

          <Button
            _hover={{
              _disabled: {},
              opacity: "0.4",
            }}
            background="yellowgreen"
            textTransform="uppercase"
            disabled={
              entryOne.length === 0 ||
              entryTwo.length === 0 ||
              exitOne.length === 0 ||
              exitTwo.length === 0 ||
              !selected
            }
            onClick={() => handleSendValues(true)}
          >
            Simular
          </Button>
        </>
      </Flex>
    </VStack>
  );
}
