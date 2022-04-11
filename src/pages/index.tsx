import { useContext, useState } from "react";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { IoMdClock } from "react-icons/io";
import { InputTime } from "../components/InputTime";
import { FcGoogle } from "react-icons/fc";
import { Menu } from "../components/Menu";
import { TableComponent } from "../components/Table";
import { TimeContext } from "../contexts/TimeContext";
import { useAuth } from "../hooks/useAuth";
import { Login } from "../components/Login";

const Home: NextPage = () => {
  const { user, signInWithGoogle, signOutAuthenticate } = useAuth();
  const { newDate, handleCalculateHoursPoint, dateTime } =
    useContext(TimeContext);
  const [entry, setEntry] = useState("");
  const [exitLunch, setExitLunch] = useState("");
  const [backLunch, setBackLunch] = useState("");
  const [exit, setExit] = useState("");

  // console.log("d", dateTime);

  return (
    <>
      <Login />
      {/* <Menu />
      <Box position="relative">
        <Box maxWidth="max-content" margin="0 auto" opacity="0.09">
          <Text textAlign="center" fontSize="2xl" color="#fff">
            Adicione seus horarios de pontos
          </Text>
          <Flex
            maxWidth="container.lg"
            margin="0 auto"
            gap="8px"
            padding="32px"
            alignItems="center"
            justifyContent="center"
          >
            <InputTime
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <InputTime
              value={exitLunch}
              onChange={(e) => setExitLunch(e.target.value)}
            />
            <InputTime
              value={backLunch}
              onChange={(e) => setBackLunch(e.target.value)}
            />
            <InputTime value={exit} onChange={(e) => setExit(e.target.value)} />

            <Button width="full" background="#ffd373">
              Adicionar
            </Button>
          </Flex>

          <TableComponent />
        </Box>
        <Flex  position="absolute" top="110px" w="100%" alignItems="center" justifyContent="center">
          <Button
            margin="0 auto"
            background="red.600"
            color="#fff"
            textAlign="center"
            
          >
            Faca uma simulacao agora mesmo
          </Button>
        </Flex>
      </Box> */}
    </>
  );
};

export default Home;
