'use client'

import React from 'react'
import { Box, Heading, Text, VStack, Alert } from '@chakra-ui/react'
import { LuAlarmClockPlus } from "react-icons/lu"
import { useSearchParams } from 'next/navigation'

export default function LandingPage() {
  const searchParams = useSearchParams()
  const className = searchParams.get('name') || 'DefaultRoom'

  return (
    <Box minH="100vh" p={8}>
      <VStack gap={6} align="start" maxW="600px" mx="auto">
        <Heading size="2xl" color="teal.600">
          Welcome to {className}
        </Heading>

        <Alert.Root status="warning">
          <Alert.Indicator>
            <LuAlarmClockPlus />
          </Alert.Indicator>
          <Alert.Title>New students have joined class</Alert.Title>
        </Alert.Root>

        <Text fontSize="md" color="gray.600">
          To verify students, click here
        </Text>
      </VStack>
    </Box>
  )
}