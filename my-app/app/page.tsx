// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Center } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../lib/firebase";

export default function RoleRouter() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      console.log("Auth state changed:", user);
      if (!user) {
        console.log("→ No user, redirecting to /auth");
        router.replace("/auth");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          console.warn("→ No Firestore doc for this user, sending to /auth");
          router.replace("/auth");
          return;
        }

        const data = userDoc.data();
        console.log("→ Firestore data:", data);
        if (data.role === "teacher") {
          console.log("→ Role=teacher, redirecting to /teacher");
          router.replace("/teacher");
        } else if (data.role === "student") {
          console.log("→ Role=student, redirecting to /student");
          router.replace("/student");
        } else {
          console.error("→ Unknown role, redirecting to /auth");
          router.replace("/auth");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        router.replace("/auth");
      }
    });

    return unsub;
  }, [auth, db, router]);

  return (
    <Center h="100vh">
      <Spinner size="xl" aria-label="Loading…" />
    </Center>
  );
}
