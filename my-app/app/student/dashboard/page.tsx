'use client';

import { Box, Heading, Text, SimpleGrid, Button, VStack, Container, Flex, HStack, Icon, Spacer} from '@chakra-ui/react';
import React from 'react';
import ClassCard from '../../../components/ui/class-card';
import { HiAcademicCap } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';


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

  const router = useRouter()

  return (
    <>
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

    <Box bg="gray.900" color="white" minH="100vh" py={16} px={6}>
      <Container maxW="7xl">
        {/* Header Section */}
        <VStack gap={3} mb={12} align="center" textAlign="center">
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            Your Enrolled Classes
          </Heading>
          <Text color="gray.400" fontSize={{ base: 'md', md: 'lg' }}>
            Access the classes you've joined
          </Text>
        </VStack>

        {/* Class Cards Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} mb={12}>
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
    </>
  );
};

export default StudentDashboard;
