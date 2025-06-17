'use client';

import React from 'react';
import { Box, Button, Grid, Heading, Stack, Text, VStack, Flex } from '@chakra-ui/react';
import ClassCard from '../../../components/ui/class-card'; // This must still support Chakra or Tailwind

const TeacherDashboard = () => {
  const classes = [
    {
      className: 'Linear Algebra I',
      classDescription: 'This is the introductory course to linear algebra and its applications',
      classId: 123456,
      role: 'teacher',
    },
    {
      className: 'Calculus II',
      classDescription: 'This is the introductory course to calculus and its applications',
      classId: 234567,
      role: 'teacher',
    },
    {
      className: 'Statistics and Probability',
      classDescription: 'This is the introductory course to statistics and probability and its applications',
      classId: 345678,
      role: 'teacher',
    },
  ];

  return (
    <Box bg="gray.900" minH="100vh" color="white" py={10} px={4}>
      <Flex justify="center">
        <Box w="full" maxW="7xl">
          <Stack spacing={10}>
            {/* Header */}
            <VStack spacing={1} textAlign="center">
              <Heading fontSize="3xl">Your Classes</Heading>
              <Text color="gray.400">Manage the courses you're teaching</Text>
            </VStack>

            {/* Create Class Button */}
            <Flex justify="flex-end">
              <Button
                bg="teal.600"
                _hover={{ bg: 'teal.500' }}
                color="white"
                fontWeight="medium"
                px={5}
                py={2}
                rounded="lg"
                shadow="md"
                onClick={() => console.log('Create New Class clicked')}
              >
                + Create New Class
              </Button>
            </Flex>

            {/* Class Cards Grid */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
              {classes.map((item) => (
                <ClassCard key={item.classId} classItem={item} />
              ))}
            </Grid>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default TeacherDashboard;

