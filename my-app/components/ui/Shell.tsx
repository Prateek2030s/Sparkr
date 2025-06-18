// components/ui/Shell.tsx
"use client";

import {
  Flex,
  VStack,
  Box,
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useRequireAuth } from "../../hooks/useRequireAuth";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Quiz", href: "/quiz" },
  { label: "Whiteboard", href: "/whiteboard" },
  { label: "Feedback", href: "/feedback" },
  { label: "Video", href: "/video" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useRequireAuth();
  const router = useRouter();
  const path = usePathname();

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <VStack
        as="nav"
        w="200px"
        bg="gray.50"
        p={4}
        gap={4}           // use gap instead of spacing
        align="stretch"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          aria-label="App logo"
        >
          🔥 LifeHack Collab
        </Text>

        {navItems.map((item) => (
          <Link
            key={item.href}
            onClick={() => router.push(item.href)}
            aria-current={path === item.href ? "page" : undefined}
            _hover={{ textDecoration: "underline" }}
          >
            {item.label}
          </Link>
        ))}

        <Box flex={1} />

        {/* Simple logout button instead of Avatar/Menu */}
        <Button
          onClick={logout}
          variant="outline"
          aria-label="Log out"
        >
          Log Out
        </Button>
      </VStack>

      {/* Main content area */}
      <Box flex={1} bg="white" p={6} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}
