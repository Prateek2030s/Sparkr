'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Container,
  Text,
} from '@chakra-ui/react';

export default function StudentJoinPage() {
  const [meetingId, setMeetingId] = useState('');
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState('');
  const jitsiRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (joined && jitsiRef.current && meetingId.trim()) {
      const domain = 'meet.jit.si';
      const roomName = extractRoomName(meetingId);

      const options = {
        roomName,
        parentNode: jitsiRef.current,
        width: '100%',
        height: 600,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_POWERED_BY: false,
        },
      };

      if (!window.JitsiMeetExternalAPI) {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = () => {
          jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
        };
        document.body.appendChild(script);
      } else {
        jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
      }
    }
  }, [joined, meetingId]);

  function extractRoomName(input: string) {
    try {
      const url = new URL(input);
      return url.pathname.split('/').filter(Boolean).pop() || input;
    } catch {
      return input.trim();
    }
  }

  function handleJoin() {
    if (meetingId.trim() === '') {
      setError('Please enter a valid meeting ID or link.');
      return;
    }
    setError('');
    setJoined(true);
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #f3e8ff, #d6bcfa)"
      color="#2D006C"
      py={12}
      px={6}
    >
      <Container maxW="container.md">
        {!joined && (
          <Heading textAlign="center" size="xl" mb={8}>
            Join Your Sparkr Meeting Room
          </Heading>
        )}

        {!joined ? (
          <VStack spacing={4}>
            <Input
              placeholder="Enter Meeting ID or Link"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              size="lg"
              bg="white"
              borderColor="#805ad5"
              _focus={{
                borderColor: '#6b46c1',
                boxShadow: '0 0 0 1px #6b46c1',
              }}
            />
            {error && (
              <Text color="red.500" fontSize="sm" textAlign="left" w="full">
                {error}
              </Text>
            )}
            <Button
              bg="#6b46c1"
              color="white"
              _hover={{ bg: '#553c9a' }}
              size="lg"
              onClick={handleJoin}
              w="full"
              rounded="lg"
              shadow="md"
            >
              Join Meeting
            </Button>
          </VStack>
        ) : (
          <Box
            ref={jitsiRef}
            mt={6}
            w="full"
            minH="600px"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
            bg="white"
          />
        )}
      </Container>
    </Box>
  );
}
