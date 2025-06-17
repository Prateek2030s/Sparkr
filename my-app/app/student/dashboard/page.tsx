'use client';

import { Box, Heading, Text, SimpleGrid, Button, VStack, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import ClassCard from '../../../components/ui/class-card'; // Assuming this is Chakra-compatible or Tailwind-styled

const StudentDashboard = () => {
  const classes = [
    {
      className: "Linear Algebra I",
      classDescription: "This is the introductory course to linear algebra and its applications",
      classId: 123456,
      role: "student"
    },
    {
      className: "Calculus II",
      classDescription: "This is the introductory course to calculus and its applications",
      classId: 234567,
      role: "student"
    },
    {
      className: "Statistics and Probability",
      classDescription: "This is the introductory course to statistics and probability and its applications",
      classId: 345678,
      role: "student"
    }
  ];

  return (
    <Box bg="gray.900" color="white" minH="100vh" py={16} px={6}>
      <Container maxW="7xl">
        {/* Header Section */}
        <VStack spacing={3} mb={12} align="center" textAlign="center">
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            Your Enrolled Classes
          </Heading>
          <Text color="gray.400" fontSize={{ base: 'md', md: 'lg' }}>
            Access the classes you've joined
          </Text>
        </VStack>

        {/* Class Cards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} mb={12}>
          {classes.map((item) => (
            <ClassCard key={item.classId} classItem={item} />
          ))}
        </SimpleGrid>

        {/* Join New Class Button */}
        <Flex justify="flex-end">
          <Button
            bg="blue.600"
            _hover={{ bg: 'blue.500' }}
            color="white"
            fontWeight="medium"
            px={6}
            py={2}
            rounded="lg"
            shadow="md"
            fontSize="md"
            onClick={() => console.log("Join New Class clicked")}
          >
            + Join New Class
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
