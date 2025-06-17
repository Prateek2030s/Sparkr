'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function StartPage() {
  const router = useRouter();
  const [className, setClassName] = useState('');
  const [error, setError] = useState('');

  const goToMeeting = () => {
    if (!className.trim()) {
      setError('Please enter a class name');
      return;
    }
    setError('');
    router.push(`/teacherJoin/videoPage?room=${encodeURIComponent(className)}`);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, #f3e8ff, #d6bcfa)"
      px={4}
    >
      <Container maxW="sm" bg="white" p={8} rounded="lg" boxShadow="lg">
        <VStack spacing={4}>
          <Heading size="lg" color="#4B0082">
            Start a New Class
          </Heading>
          <Input
            placeholder="Enter Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            bg="white"
            borderColor="purple.300"
            focusBorderColor="purple.500"
          />
          {error && (
            <Text color="red.500" fontSize="sm" alignSelf="flex-start">
              {error}
            </Text>
          )}
          <Button
            bg="purple.600"
            color="white"
            _hover={{ bg: 'purple.700' }}
            size="md"
            w="full"
            onClick={goToMeeting}
          >
            Start Meeting
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
