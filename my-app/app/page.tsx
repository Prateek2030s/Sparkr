'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Page() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, #f3e8ff, #d6bcfa)"
      color="gray.900"
      px={6}
      py={12}
      _dark={{
        bgGradient: 'linear(to-br, #1a0e2a, #2e1e47)',
        color: 'white',
      }}
    >
      <Container maxW="2xl" textAlign="center">
        <VStack spacing={6}>
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            color="purple.700"
            _dark={{ color: 'purple.300' }}
          >
            Welcome to{' '}
            <Box as="span" color="purple.900" _dark={{ color: 'purple.400' }}>
              Sparkr
            </Box>
          </Heading>
          <Text fontSize={{ base: 'lg', sm: 'xl' }} color="purple.800" _dark={{ color: 'purple.200' }}>
            A smarter way to connect, learn, and grow. Choose your role to get started.
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing = {4} 
            pt={4}
            justify="center"
            align="center"
          >
            <Link href="/studentJoin" passHref>
              <Button
                as="a"
                size="lg"
                bg="purple.700"
                color="white"
                _hover={{ bg: 'purple.800' }}
                rounded="full"
                shadow="md"
              >
                I'm a Student
              </Button>
            </Link>
            <Link href="/teacherJoin" passHref>
              <Button
                as="a"
                size="lg"
                variant="outline"
                color="purple.700"
                borderColor="purple.700"
                _dark={{
                  color: 'purple.300',
                  borderColor: 'purple.300',
                  _hover: { bg: 'purple.900' },
                }}
                _hover={{ bg: 'purple.100' }}
                rounded="full"
                shadow="md"
              >
                I'm a Teacher
              </Button>
            </Link>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
}
