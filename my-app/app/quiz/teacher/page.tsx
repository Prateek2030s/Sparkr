'use client';

import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function TeacherCreateQuizPage() {
  const { cid } = useParams();
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', correctAnswer: '' },
  ]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz-${cid}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuizName(parsed.name || '');
      setQuestions(parsed.questions || []);
    }
  }, [cid]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', correctAnswer: '' }]);
    setSaved(false);
  };

  const updateQuestion = (index: number, field: 'question' | 'correctAnswer', value: string) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
    setSaved(false);
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    setSaved(false);
  };

  const saveQuiz = () => {
    const quizData = {
      name: quizName,
      questions,
    };
    localStorage.setItem(`quiz-${cid}`, JSON.stringify(quizData));
    setSaved(true);
  };

  return (
    <Box maxW="700px" mx="auto" p={8}>
      <Heading size="lg" mb={6} textAlign="center">
        {quizName.trim() ? quizName : `Create Custom Quiz — Classroom: ${cid}`}
      </Heading>

      <VStack gap={6} align="stretch">
        <Box>
          <Text fontWeight="semibold" mb={2}>Quiz Name</Text>
          <Input
            placeholder="Enter quiz name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </Box>

        {questions.map((q, i) => (
          <Box key={i} p={4} borderWidth={1} borderRadius="md">
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="semibold">Question {i + 1}</Text>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => deleteQuestion(i)}
              >
                Delete
              </Button>
            </HStack>
            <Stack gap={2}>
              <Input
                placeholder="Enter question text"
                value={q.question}
                onChange={(e) => updateQuestion(i, 'question', e.target.value)}
              />
              <Input
                placeholder="Enter correct answer"
                value={q.correctAnswer}
                onChange={(e) => updateQuestion(i, 'correctAnswer', e.target.value)}
              />
            </Stack>
          </Box>
        ))}

        <Button onClick={addQuestion} colorScheme="blue">
          Add Another Question
        </Button>

        <Button onClick={saveQuiz} colorScheme="teal">
          Save Quiz
        </Button>

        {saved && (
          <Box bg="green.50" p={4} borderRadius="md" borderWidth="1px">
            <Text fontWeight="semibold" color="green.700">
              Quiz saved to your browser!
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}