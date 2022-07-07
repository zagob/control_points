import { Flex, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Menu } from "../components/Menu";
import { useAuth } from "../hooks/useAuth";
import { Login } from "../components/Login";

import { Main } from "../components/Main";

const Home: NextPage = () => {
  const { user, loadingAuth } = useAuth();

  return (
    <>
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
