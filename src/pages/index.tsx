import { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
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
import { Main } from "../components/Main";
import { ModalComponent } from "../components/ModalContent";

const Home: NextPage = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { user, signInWithGoogle, signOutAuthenticate, handleAuthState } =
    useAuth();
  const { newDate, handleCalculateHoursPoint, dateTime } =
    useContext(TimeContext);

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
      <ModalComponent isOpen={isOpen} onClose={onClose} />
      {user ? (
        <>
          <Menu />
          <Main />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
