import { Unsubscribe } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

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
  signInWithGoogle: () => Promise<void>;
  signOutAuthenticate: () => Promise<void>;
  handleAuthState: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  console.log(user);

  async function handleAuthState() {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

    // return () => {
    //   unsubscribe();
    // };
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
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function signOutAuthenticate() {
    await signOut(auth);
    setUser(undefined);
  }
  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOutAuthenticate, handleAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
}
