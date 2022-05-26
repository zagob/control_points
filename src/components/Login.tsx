import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
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
        <Flex
          w={{ base: '', lg: '100%' }}
          gap="12px"
          justifyContent="space-around"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <InputTime />
          <InputTime />
          <InputTime />
          <InputTime />
        </Flex>
        <Button
          textTransform="uppercase"
          padding={{ base: "10px 0", lg: "32px 0" }}
          fontSize={{ base: "18", lg: "26px" }}
          fontWeight="700"
          background="green.400"
          w={{ base: "200px", lg: "100%" }}
          _hover={{ opacity: "0.8" }}
        >
          Simular
        </Button>
        <Box w="full" mt="32px">
          <Text fontSize={{ base: '18px', lg: '22px' }} color="#fff" fontWeight="300">
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
