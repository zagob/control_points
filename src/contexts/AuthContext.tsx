import { useRouter } from "next/router";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  auth,
  signOut,
  onAuthStateChanged,
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
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  console.log(user)

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
      value={{ user, signInWithGoogle, signOutAuthenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
