// app/page.tsx
"use client";

import { keyframes } from "@emotion/react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

// Pulsing glow + slight pop
const pulse = keyframes`
  0%   { box-shadow: 0 0 12px rgba(59,130,246,0.8); transform: scale(1); }
  50%  { box-shadow: 0 0 24px rgba(59,130,246,1);   transform: scale(1.03); }
  100% { box-shadow: 0 0 12px rgba(59,130,246,0.8); transform: scale(1); }
`;

export default function HomePage() {
  return (
    <Box
      as="main"
      w="100vw"
      h="100vh"
      position="relative"
      overflow="hidden"
      bg="#0b1120"
      color="white"
    >
      <Container maxW="7xl" h="100%" p={0} pl={{ base: 4, md: 16 }}>
        <Flex
          h="100%"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          wrap="nowrap"
        >
          {/* Left column: logo, headline & CTA */}
          <Box flex="1" minW={0} textAlign={{ base: "center", md: "left" }}>
            {/* full‐width logo with preserved aspect ratio */}
            <Image
              src="/sparkr-logo.png"
              alt="Sparkr logo"
              maxW={{ base: "120px", md: "160px", lg: "200px" }}
              w="auto"
              h="auto"
              objectFit="contain"
              mb={4}
              mx={{ base: "auto", md: 0 }}
            />

            {/* Sub‐headline */}
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="normal"
              lineHeight="shorter"
              color="brand.400"
              mb={6}
            >
              Ignite a new way of learning
            </Heading>

            {/* Get Started button */}
            <Link href="/auth" passHref>
              <Button
                as="a"
                size="lg"
                fontSize={{ base: "md", md: "lg" }}
                bg="brand.500"
                _hover={{ bg: "brand.600", transform: "scale(1.02)" }}
                px={{ base: 6, md: 8 }}
                animation={`${pulse} 1.5s ease-in-out infinite`}
              >
                Get Started
              </Button>
            </Link>
          </Box>

          {/* Right column: rocket image + fades */}
          <Box flex="1" minW={0} position="relative" h="100%">
            <Image
              src="/rocket.png"
              alt="Rocket taking off"
              objectFit="cover"
              w="100%"
              h="100%"
              draggable={false}
            />
            {/* Left fade overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              h="100%"
              w={{ base: "20%", md: "10%" }}
              bgGradient="linear(to-r, #0b1120, transparent)"
            />
            {/* Right fade overlay */}
            <Box
              position="absolute"
              top={0}
              right={0}
              h="100%"
              w={{ base: "20%", md: "10%" }}
              bgGradient="linear(to-l, #0b1120, transparent)"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
