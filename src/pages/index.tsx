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

import {
  db,
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  getDoc,
  setDoc,
} from "../services/Firebase";

const Home: NextPage = () => {
  const { user, signInWithGoogle, signOutAuthenticate, handleAuthState } =
    useAuth();
  const { newDate, handleCalculateHoursPoint, dateTime } =
    useContext(TimeContext);
  const [entryOne, setEntryOne] = useState("");
  const [exitOne, setExitOne] = useState("");
  const [entryTwo, setEntryTwo] = useState("");
  const [exitTwo, setExitTwo] = useState("");

  async function handleSendValues() {
    handleCalculateHoursPoint(entryOne, exitOne, entryTwo, exitTwo);
    console.log(dateTime)
  }
  async function handleGetUser() {
    // setDoc(doc(db, "users", '123', 'points', String(new Date().getTime())), {
    //   entry: '3'
    // })
    const queryUser = doc(db, "users", user.id);
    const q = await getDocs(collection(queryUser, "points"));
    console.log(
      q.docs.map((item) => {
        return {
          ...item.data(),
        };
      })
    );
  }

  return (
    <>
      {/* <Login /> */}
      <Menu />
      <Box maxWidth="max-content" margin="0 auto">
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
            value={entryOne}
            onChange={(e) => setEntryOne(e.target.value)}
          />
          <InputTime
            value={exitOne}
            onChange={(e) => setExitOne(e.target.value)}
          />
          <InputTime
            value={entryTwo}
            onChange={(e) => setEntryTwo(e.target.value)}
          />
          <InputTime
            value={exitTwo}
            onChange={(e) => setExitTwo(e.target.value)}
          />

          <Button width="full" background="#ffd373" onClick={handleSendValues}>
            Adicionar
          </Button>
        </Flex>

        <TableComponent />
      </Box>
    </>
  );
};

export default Home;
