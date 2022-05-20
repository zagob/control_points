import { useBoolean } from "@chakra-ui/react";
import { Unsubscribe } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";

import {
  GoogleAuthProvider,
  signInWithPopup,
  auth,
  signOut,
  onAuthStateChanged,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  db,
} from "../services/Firebase";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextProps {
  user: User | undefined;
  loadingAuth: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutAuthenticate: () => Promise<void>;
  handleAuthState: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loadingAuth, setLoadingAuth] = useBoolean(true);
  const [user, setUser] = useState<User>();
  console.log(user);

  async function handleAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, uid, photoURL } = user;

        const ref = doc(db, "users", uid);
        const docExist = await getDoc(ref);

        if (docExist.exists()) {
          await updateDoc(ref, {
            id: uid,
            name: displayName,
          });
        } else {
          await setDoc(doc(db, "users", uid), {
            id: uid,
            name: displayName,
          });
        }
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid, photoURL } = user;

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
      setLoadingAuth.off();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    console.log('RESULT',result)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });

      await api.post("/users/create", {
        id: uid,
        name: displayName,
        image: photoURL,
      });
    }
  }

  async function signOutAuthenticate() {
    await signOut(auth);
    setUser(undefined);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOutAuthenticate,
        handleAuthState,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
