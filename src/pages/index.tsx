import { Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Menu } from "../components/Menu";
import { useAuth } from "../hooks/useAuth";
import { Login } from "../components/Login";

import { Main } from "../components/Main";
import { ModalComponent } from "../components/ModalContent";

const Home: NextPage = () => {
  const { isOpen, onClose } = useDisclosure();
  const { user, loadingAuth } = useAuth();

  return (
    <>
      <ModalComponent isOpen={isOpen} onClose={onClose} />
      {loadingAuth && !user && (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="gray" />
        </Flex>
      )}

      {!loadingAuth && user && (
        <>
          <Menu />
          <Main />
        </>
      )}

      {!loadingAuth && !user && (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Home;