'use client';

import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

// Hardcoded quiz questions
const hardcodedQuiz = [
  { question: 'What is 2 + 2?', correctAnswer: '4' },
  { question: 'Capital of France?', correctAnswer: 'Paris' },
  { question: 'Color of sky?', correctAnswer: 'Blue' },
  { question: 'Spider has how many legs?', correctAnswer: '8' },
  { question: 'Planet we live on?', correctAnswer: 'Earth' },
  { question: 'Programming language?', correctAnswer: 'Python' },
  { question: 'What is H2O?', correctAnswer: 'Water' },
  { question: '5 x 5 = ?', correctAnswer: '25' },
  { question: 'Which is a fruit?', correctAnswer: 'Banana' },
  { question: 'Opposite of up?', correctAnswer: 'Down' },
];

export default function TeacherCreateQuizPage() {
  const { cid } = useParams();
  const [created, setCreated] = useState(false);

  const handleCreateQuiz = () => {
    // Simulate quiz creation by saving to local storage (or this can be changed to Firestore)
    localStorage.setItem(`quiz-${cid}`, JSON.stringify(hardcodedQuiz));
    setCreated(true);
  };

  return (
    <Box maxW="600px" mx="auto" p={8}>
      <Heading size="lg" mb={6} textAlign="center">
        Create Quiz — Classroom: {cid}
      </Heading>

      <VStack gap={6}>
        <Text fontSize="md">
          Click below to create a 10-question quiz using the default question set.
        </Text>

        <Button colorScheme="teal" onClick={handleCreateQuiz} disabled={created}>
          {created ? 'Quiz Created ✅' : 'Create Quiz'}
        </Button>

        {created && (
          <Box bg="green.50" p={4} borderRadius="md" borderWidth="1px">
            <Text fontWeight="semibold" color="green.700">
              Success! The quiz is ready to be taken by students.
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}