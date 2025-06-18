'use client';

import { Box, Flex, Icon, Text, Button, HStack, Spacer } from '@chakra-ui/react';
import { HiAcademicCap } from 'react-icons/hi2';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const { classId } = useParams();
  const searchParams = useSearchParams();
  const className = searchParams.get('name') || 'DefaultRoom';

  return (
    <Box as="nav" w="full" bg="gray.800" shadow="md" py={3}>
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        align="center"
        h="60px"
      >
        {/* Brand */}
        <HStack gap={2}>
          <Icon as={HiAcademicCap} fontSize="2xl" color="white" />
          <Text fontSize="xl" fontWeight="bold" color="white">
            Sparkr
          </Text>
        </HStack>

        <Spacer />

        {/* Nav Links */}
        <HStack
          gap={6}
          display={{ base: 'none', md: 'flex' }}
          bg="gray.700"
          px={4}
          py={2}
          borderRadius="lg"
        >
          <Button
            variant="ghost"
            color="white"
            _hover={{ color: 'teal.300', bg: 'transparent' }}
            onClick={() => router.push('/teacher/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            color="white"
            _hover={{ color: 'teal.300', bg: 'transparent' }}
            onClick={() => router.push(`teacher/classroom/${classId}/quiz`)}
          >
            Quizzes
          </Button>
          <Button
            variant="ghost"
            color="white"
            _hover={{ color: 'teal.300', bg: 'transparent' }}
            onClick={() =>
              router.push(
                `/teacher/classroom/${classId}/conference/?room=${encodeURIComponent(className)}`
              )
            }
          >
            Live Class
          </Button>
        </HStack>

        {/* Logout */}
        <Button
          ml={4}
          color="red.400"
          border="1px solid"
          borderColor="red.400"
          bg="transparent"
          _hover={{ bg: 'red.500', color: 'white' }}
          px={4}
          py={1}
          borderRadius="md"
          fontSize="sm"
          onClick={async () => {await fetch('/api/logout', {method: 'POST',}); router.push('/');}}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};
