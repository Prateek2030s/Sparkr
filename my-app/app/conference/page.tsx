'use client';

import { useEffect, useRef } from 'react';

export default function VideoCallPage() {
  const jitsiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && jitsiRef.current) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'MyAwesomeRoom123', // Change this to anything you want
        parentNode: jitsiRef.current,
        width: '100%',
        height: 600,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
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
    <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        🔗 Join the Video Conference
      </h1>
      <p className="text-center text-sm sm:text-base max-w-xl">
        This is a demo Jitsi Meet video call embedded into a custom Next.js app. Share the room link to invite others.
      </p>
      <div
        ref={jitsiRef}
        className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900"
        style={{ minHeight: 600 }}
      />
      <p className="text-xs text-gray-500">
        Powered by <a href="https://jitsi.org" target="_blank" rel="noreferrer" className="underline">Jitsi Meet</a>
      </p>
    </main>
  );
}