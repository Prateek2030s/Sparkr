'use client';

import { Box, Heading, Text, SimpleGrid, Button, VStack, Container, Flex, HStack, Icon, Spacer, Stack, Grid} from '@chakra-ui/react';
import React from 'react';
import ClassCard from '../../../components/ui/class-card';
import { HiAcademicCap } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

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

    <Box bg="gray.900" minH="100vh" color="white" py={10} px={4}>
      <Flex justify="center">
        <Box w="full" maxW="7xl">
          <Stack gap={10}>
            {/* Header */}
            <VStack gap={1} textAlign="center">
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
    </>
  );
};

export default TeacherDashboard;

