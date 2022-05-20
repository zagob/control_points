import { Flex, Spinner, useDisclosure } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { Menu } from "../components/Menu";
import { useAuth } from "../hooks/useAuth";
import { Login } from "../components/Login";

import { Main } from "../components/Main";
import { ModalComponent } from "../components/ModalContent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/Firebase";
import { useEffect } from "react";

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

// export const getStaticProps: GetStaticProps = async () => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     console.log("STATIC USER", user);
//     return user;
//     // if (user) {
//     //   const { displayName, uid, photoURL } = user;

//     //   // setUser({
//     //   //   id: uid,
//     //   //   name: displayName,
//     //   //   avatar: photoURL,
//     //   // });
//     // }
//     // setLoadingAuth.off();
//   });

//   unsubscribe();

//   return {
//     props: {},
//   };
// };
