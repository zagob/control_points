import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoMdClock } from "react-icons/io";
import { InputTime } from "../components/InputTime";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { signInWithGoogle, handleAuthState } = useAuth();

  async function signAndCreateUserDB() {
    await signInWithGoogle();
    await handleAuthState();
  }
  return (
    <Flex w="100%" alignItems="center" justify="center" height="100vh">
      <Flex gap="10px" flexDirection="column" alignItems="center">
        <Flex width="100%">
          <Flex
            flexDirection={{ base: "column", lg: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <Heading color="#fff" fontSize={{ base: "18px", lg: "28px" }}>
              CONTROLE DE FORMA FÁCIL
            </Heading>
            <Heading color="#fff" fontSize={{ base: "18px", lg: "26px" }}>
              SEUS PONTOS DE HORÁRIOS.
            </Heading>
          </Flex>
          <IoMdClock fontSize="120px" color="#fff" />
        </Flex>
        <Flex
          w={{ base: "", lg: "100%" }}
          gap="12px"
          justifyContent="space-around"
          flexDirection="column"
        >
          <HStack>
            <FormControl>
              <FormLabel color="#fff">Entrada 1</FormLabel>
              <InputTime />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Saída 1</FormLabel>
              <InputTime />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel color="#fff">Entrada 2</FormLabel>
              <InputTime />
            </FormControl>
            <FormControl>
              <FormLabel color="#fff">Saída 2</FormLabel>
              <InputTime />
            </FormControl>
          </HStack>
          <Button
            textTransform="uppercase"
            padding={{ base: "10px 0", lg: "32px 0" }}
            fontSize={{ base: "18", lg: "26px" }}
            fontWeight="700"
            background="green.400"
            w="100%"
            _hover={{ opacity: "0.8" }}
          >
            Simular
          </Button>
        </Flex>
        <Box w="full" mt="32px">
          <Text
            fontSize={{ base: "18px", lg: "22px" }}
            color="#fff"
            fontWeight="300"
          >
            Faça login com google para gerenciar <br /> suas horas de pontos.
          </Text>

          <Button
            mt="12px"
            background="blue.400"
            display="flex"
            gap="12px"
            color="#fff"
            _hover={{ opacity: "0.8" }}
            onClick={signAndCreateUserDB}
          >
            <FcGoogle fontSize="32px" />
            Fazer login com Google
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
