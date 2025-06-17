'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TeacherVideoCallPage() {
  const jitsiRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [jitsi, setJitsi] = useState<any>(null);
  const initializedRef = useRef(false);
  const searchParams = useSearchParams();
  const className = searchParams.get('room') || 'DefaultRoom';

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const domain = 'meet.jit.si';
    const options = {
      roomName: className,
      parentNode: jitsiRef.current,
      width: '100%',
      height: 600,
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: true,
        SHOW_BRAND_WATERMARK: true,
        SHOW_POWERED_BY: false,
      },
    };

    const loadJitsi = () => {
      if (typeof window !== 'undefined' && jitsiRef.current) {
        if (window.JitsiMeetExternalAPI) {
          const api = new window.JitsiMeetExternalAPI(domain, options);
          setJitsi(api);
        } else {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.async = true;
          script.onload = () => {
            const api = new window.JitsiMeetExternalAPI(domain, options);
            setJitsi(api);
          };
          document.body.appendChild(script);
        }
      }
    };

    loadJitsi();

    return () => {
      if (jitsi) {
        jitsi.dispose();
      }
      // Also clean up any script we added
      const script = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [jitsi]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 dark:from-[#1a0e2a] dark:to-[#2e1e47] text-purple-900 dark:text-purple-200 p-6 space-y-6">
      <div
        ref={jitsiRef}
        className="w-full max-w-6xl rounded-xl overflow-hidden shadow-xl bg-white dark:bg-[#1f1a2e]"
        style={{ minHeight: 600 }}
      />
    </main>
  );
}