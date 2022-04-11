import { Avatar, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { IoMdClock } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hooks/useAuth";

export function Menu() {
  const { user, signOutAuthenticate, signInWithGoogle } = useAuth();
  return (
    <Flex p="12px 32px" alignItems="center" gap="8px">
      <Flex alignItems="center">
        <Heading color="whiteAlpha.800">Control Points</Heading>
        <IoMdClock fontSize="40px" color="green" />
      </Flex>
      <Flex alignItems="center" gap="8px" flex="1" justifyContent="flex-end">
        {!user ? (
          <Button
            display="flex"
            alignItems="center"
            background="blue.400"
            color="#fff"
            onClick={() => signInWithGoogle()}
          >
            <FcGoogle fontSize="32px" />
            Faça login com Google
          </Button>
        ) : (
          <>
            <Avatar width="14" height="14" src={user.avatar} />
            <Text color="#fff">Olá, {user.name}</Text>
            <Button
              display="flex"
              alignItems="center"
              gap="8px"
              background="none"
              border="1px solid #fff"
              color="whiteAlpha.700"
              _hover={{ opacity: "0.6" }}
              onClick={() => signOutAuthenticate()}
            >
              Sair
              <AiOutlinePoweroff fontSize="22px" />
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
