'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  Badge,
  HStack,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const quiz = [
  { question: 'What is 2 + 2?', correctAnswer: '4' },
  { question: 'Capital of France?', correctAnswer: 'Paris' },
  { question: 'Which is best team in LifeHack25. Please type the team ID.', correctAnswer: '17' },
  { question: 'Spider has how many legs?', correctAnswer: '8' },
  { question: 'Planet we live on?', correctAnswer: 'Earth' },
  { question: 'Team 17 will win. True or False?', correctAnswer: 'True' },
  { question: 'What is H2O?', correctAnswer: 'Water' },
  { question: '5 x 5 = ?', correctAnswer: '25' },
  { question: 'Which is a fruit that has a yellow skin?', correctAnswer: 'Banana' },
  { question: 'Opposite of up?', correctAnswer: 'Down' },
];

const students = [
  {
    name: 'Khant Minn',
    answers: ['4', 'Paris', '17', '8', 'Earth', 'True', 'Water', '25', 'Lemon', 'Down'],
    score: 9,
  },
  {
    name: 'Sujith',
    answers: ['4', 'Berlin', '17', '6', 'Mars', 'True', 'Oxygen', '15', 'Banana', 'Up'],
    score: 4,
  },
];

export default function QuizPage() {
  const { classId } = useParams();
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(true);

  const handleSubmit = () => {
    const correct = userInput.trim().toLowerCase() === quiz[currentQuestion].correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setUserAnswers([...userAnswers, userInput]);
    setShowResult(true);
  };

  const handleNext = () => {
    setUserInput('');
    setShowResult(false);
    setIsCorrect(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleReturn = () => {
    router.push('/dashboard');
  };

  const userScore = userAnswers.reduce((score, ans, index) => {
    return score + (ans.trim().toLowerCase() === quiz[index].correctAnswer.toLowerCase() ? 1 : 0);
  }, 0);

  const allParticipants = [
    ...students,
    {
      name: 'You - UNATTEMPTED',
      answers: [],
      score: userScore,
    },
  ];

  // Sort participants by score (descending)
  const sortedParticipants = [...allParticipants].sort((a, b) => b.score - a.score);

  const medalEmoji = (rank: number) => {
    switch (rank) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={8}>
      <Heading size="lg" mb={6} textAlign="center">
        {isFinished ? '🏆 Leaderboard — Classroom: ' + classId : '📝 Linear Algebra Practice 1 ' /*+ cid*/}
      </Heading>

      {!isFinished ? (
        <Box>
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            Q{currentQuestion + 1}: {quiz[currentQuestion].question}
          </Text>

          {!showResult ? (
            <Stack gap={4} maxW="400px">
              <Input
                placeholder="Your answer"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button colorScheme="teal" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          ) : (
            <Box>
              <Text color={isCorrect ? 'green.600' : 'red.600'} fontWeight="bold" mb={4}>
                {isCorrect ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${quiz[currentQuestion].correctAnswer}`}
              </Text>
              {currentQuestion < quiz.length - 1 ? (
                <Button colorScheme="blue" onClick={handleNext}>
                  Next Question
                </Button>
              ) : (
                <Button colorScheme="purple" onClick={handleFinish}>
                  Finish Quiz
                </Button>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <VStack gap={6}>
          {sortedParticipants.map((student, i) => (
            <Box key={i} w="100%" p={4} borderWidth={1} borderRadius="md">
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="semibold">
                  {medalEmoji(i)} {student.name}
                </Text>
                <Badge colorScheme={student.score >= 5 ? 'green' : 'red'}>
                  Score: {student.score} / 10
                </Badge>
              </Flex>
              <HStack wrap="wrap" gap={2} align="start">
                {student.answers.map((ans, j) => (
                  <Badge
                    key={j}
                    colorScheme={ans.trim().toLowerCase() === quiz[j].correctAnswer.toLowerCase() ? 'green' : 'red'}
                    fontSize="0.8em"
                  >
                    Q{j + 1}: {ans}
                  </Badge>
                ))}
              </HStack>
            </Box>
          ))}

          <Button mt={4} colorScheme="gray" onClick={() => router.push(`/student/classroom/${classId}/quiz/take-quiz`)}>
            Take the quiz
          </Button>
        </VStack>
      )}
    </Box>
  );
}
