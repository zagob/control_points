import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { IoMdClock } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { signInWithGoogle, handleAuthState } = useAuth();

  async function signAndCreateUserDB() {
    await signInWithGoogle();
    await handleAuthState();
  }

  return (
    <Flex
      w="100%"
      alignItems="center"
      justify="center"
      height="100vh"
      padding="0 2rem"
    >
      <Flex gap="10px" flexDirection="column" alignItems="center">
        <Flex
          w={{ base: "", lg: "100%" }}
          gap="12px"
          justifyContent="space-around"
          flexDirection="column"
        >
          <IoMdClock fontSize="120px" color="#fff" />
        </Flex>
        <Box w="full" mt="32px">
          <Text
            fontSize={{ base: "0.7rem", lg: "2rem" }}
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
            padding={{ base: "", lg: "4" }}
            onClick={signAndCreateUserDB}
            fontSize={{ base: "0.7rem", lg: "1rem" }}
          >
            <FcGoogle fontSize="32px" />
            Fazer login com Google
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
