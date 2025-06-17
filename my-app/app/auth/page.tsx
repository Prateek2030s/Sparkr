// app/auth/page.tsx
"use client";

import {
  Container,
  Heading,
  Input,
  Button,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", user.uid), {
          role,
          displayName,
          email,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      window.alert(msg);
    }
  };

  return (
    <Container maxW="sm" py={8}>
      <Heading mb={6} textAlign="center">
        {mode === "signup" ? "Sign Up" : "Log In"}
      </Heading>

      <form onSubmit={handleSubmit}>
        {/* Role picker */}
        <Box mb={4}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as "teacher" | "student")}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #CBD5E0",
            }}
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </Box>

        {/* Display Name (signup only) */}
        {mode === "signup" && (
          <Box mb={4}>
            <label htmlFor="displayName">Display Name</label>
            <Input
              id="displayName"
              placeholder="Your name"
              mt={1}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Box>
        )}

        {/* Email */}
        <Box mb={4}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            mt={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Password */}
        <Box mb={6}>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            mt={1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        {/* Buttons */}
        <Stack direction="row" gap={4} justify="center">
          <Button type="submit" colorScheme="teal">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              setMode((prev) => (prev === "signup" ? "login" : "signup"))
            }
          >
            {mode === "signup"
              ? "Have an account? Log In"
              : "No account? Sign Up"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
