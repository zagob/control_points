import { Avatar, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { IoMdClock } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";

export function Menu() {
  const { user, signOutAuthenticate } = useAuth();
  return (
    <Flex
      maxW="1180px"
      margin="0 auto"
      p="12px 32px"
      alignItems="center"
      gap="8px"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Flex alignItems="flex-end" gap="12px">
        <Heading color="whiteAlpha.800">Control Points</Heading>
        <IoMdClock fontSize="50" color="#fff" />
      </Flex>
      <Flex alignItems="center" gap="8px" flex="1" justifyContent="flex-end">
        <Avatar width="14" height="14" src={user.avatar} />
        <Text color="#fff">Olá, {user.name}</Text>
        <Button
          display="flex"
          alignItems="center"
          gap="8px"
          background="none"
          border="1px solid rgba(255, 255, 255, 0.2)"
          color="whiteAlpha.700"
          _hover={{ color: "#fff", border: "1px solid #fff" }}
          onClick={() => signOutAuthenticate()}
        >
          Sair
          <AiOutlinePoweroff fontSize="22px" />
        </Button>
      </Flex>
    </Flex>
  );
}
