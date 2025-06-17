'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
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
        height: '80vh', // Use viewport height for responsive sizing
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_POWERED_BY: false,
          // Additional options to maximize video space
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
          ],
          VERTICAL_FILMSTRIP: false,
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

  // ... (keep the rest of your functions the same)
    const extractRoomName = (input: string) => {
    try {
      const url = new URL(input);
      return url.pathname.split('/').filter(Boolean).pop() || input;
    } catch {
      return input.trim();
    }
  };

  const handleJoin = () => {
    if (meetingId.trim() === '') {
      setError('Please enter a valid meeting ID or link.');
      return;
    }
    setError('');
    setJoined(true);
  };

  return (
    <Flex
      minH="100vh"
      bg="gray.900"
      align="center"
      justify="center"
      px={4}
      py={8}
    >
      <Box
        bg="gray.800"
        p={{ base: 6, md: 10 }}
        borderRadius="2xl"
        boxShadow="2xl"
        w="full"
        maxW="6xl" // Increased from "lg" to "6xl" for wider container
      >
        {!joined ? (
          <VStack spacing={6} align="stretch">
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              color="white"
              textAlign="center"
            >
              Join a Sparkr Meeting
            </Heading>

            <Input
              size="lg"
              placeholder="Enter Meeting ID or Link"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              bg="gray.700"
              color="white"
              borderColor="teal.400"
              _placeholder={{ color: 'gray.400' }}
              _focus={{
                borderColor: 'teal.300',
                boxShadow: '0 0 0 1px teal.300',
              }}
            />

            {error && (
              <Text fontSize="sm" color="red.400" textAlign="left">
                {error}
              </Text>
            )}

            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleJoin}
              isDisabled={!meetingId.trim()}
              rounded="lg"
              fontWeight="bold"
              fontSize="lg"
            >
              Join Meeting
            </Button>
          </VStack>
        ) : (
          <Box
            ref={jitsiRef}
            mt={4}
            w="full"
            h="80vh" // Match the height with Jitsi options
            minH="600px" // Minimum height
            borderRadius="xl"
            overflow="hidden"
            bg="white"
          />
        )}
      </Box>
    </Flex>
  );
}