'use client';

import { useEffect, useRef } from 'react';

export default function VideoCallPage() {
  const jitsiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && jitsiRef.current) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'SparkrDemoRoom123', // customize as needed
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
        script.onload = () => new window.JitsiMeetExternalAPI(domain, options);
        document.body.appendChild(script);
      } else {
        new window.JitsiMeetExternalAPI(domain, options);
      }
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 dark:from-[#1a0e2a] dark:to-[#2e1e47] text-purple-900 dark:text-purple-200 p-6 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        🎥 Welcome to Your Sparkr Meeting Room
      </h1>
      <div
        ref={jitsiRef}
        className="w-full max-w-6xl rounded-xl overflow-hidden shadow-xl bg-white dark:bg-[#1f1a2e]"
        style={{ minHeight: 600 }}
      />
      <p className="text-xs text-purple-700 dark:text-purple-300">
        Powered by{' '}
        <a
          href="https://jitsi.org"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-purple-900 dark:hover:text-white"
        >
          Jitsi Meet
        </a>
      </p>
    </main>
  );
}
