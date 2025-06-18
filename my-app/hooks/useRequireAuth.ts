// hooks/useRequireAuth.ts
"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "../lib/firebase";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/auth");
      } else {
        setUser(u);
      }
    });
    return unsub;
  }, [auth, router]);

  const logout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return { user, logout };
}
