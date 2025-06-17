'use client';

import { useState, useEffect, useRef } from 'react';

export default function StudentJoinPage() {
  const [meetingId, setMeetingId] = useState('');
  const [joined, setJoined] = useState(false);
  const jitsiRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  // Clean up Jitsi API when component unmounts or meetingId changes
  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, []);

  // Initialize Jitsi when joined and meetingId valid
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

      // Load script if needed
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

  // Helper: extract room name from link or just use input as room name
  function extractRoomName(input: string) {
    try {
      // If user pastes full URL, parse it
      const url = new URL(input);
      // URL path after last '/' is room
      return url.pathname.split('/').filter(Boolean).pop() || input;
    } catch {
      // If invalid URL, assume input is room name directly
      return input.trim();
    }
  }

  function handleJoin() {
    if (meetingId.trim() === '') {
      alert('Please enter a valid meeting ID or link');
      return;
    }
    setJoined(true);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 dark:from-[#1a0e2a] dark:to-[#2e1e47] text-purple-900 dark:text-purple-200 p-6 space-y-6">
      {!joined && (
  <h1 className="text-3xl sm:text-4xl font-bold text-center">
    Join Your Sparkr Meeting Room
  </h1>
)}

      {!joined ? (
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Meeting ID or Link"
            value={meetingId}
            onChange={e => setMeetingId(e.target.value)}
            className="px-4 py-3 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-[#2e1e47] dark:border-purple-700 dark:text-purple-200"
          />
          <button
            onClick={handleJoin}
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Join Meeting
          </button>
        </div>
      ) : (
        <div
          ref={jitsiRef}
          className="w-full max-w-6xl rounded-xl overflow-hidden shadow-xl bg-white dark:bg-[#1f1a2e]"
          style={{ minHeight: 600 }}
        />
      )}
    </main>
  );
}
