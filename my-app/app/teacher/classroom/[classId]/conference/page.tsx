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
      height: '100%', // Changed to 100% to fill container
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        // Add these to force dark theme in Jitsi
        theme: 'dark',
        filmStripOnly: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: true,
        SHOW_BRAND_WATERMARK: true,
        SHOW_POWERED_BY: false,
        // Dark mode specific config
        DEFAULT_BACKGROUND: '#000000',
        DEFAULT_REMOTE_DISPLAY_NAME: 'Participant',
        DEFAULT_LOCAL_DISPLAY_NAME: 'Me',
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'settings', 'raisehand', 'videoquality', 'filmstrip',
          'invite', 'feedback', 'stats', 'shortcuts', 'tileview', 'select-background',
          'download', 'help', 'mute-everyone', 'security'
        ],
      },
    };

    const loadJitsi = () => {
      if (typeof window !== 'undefined' && jitsiRef.current) {
        if (window.JitsiMeetExternalAPI) {
          const api = new window.JitsiMeetExternalAPI(domain, options);
          setJitsi(api);
          
          // Additional styling after load
          setTimeout(() => {
            const iframe = jitsiRef.current?.querySelector('iframe');
            if (iframe) {
              iframe.style.backgroundColor = 'black';
            }
          }, 1000);
        } else {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.async = true;
          script.onload = () => {
            const api = new window.JitsiMeetExternalAPI(domain, options);
            setJitsi(api);
            
            // Additional styling after load
            setTimeout(() => {
              const iframe = jitsiRef.current?.querySelector('iframe');
              if (iframe) {
                iframe.style.backgroundColor = 'black';
              }
            }, 1000);
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
      const script = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [jitsi]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-black text-white p-0">
      <div
        ref={jitsiRef}
        className="w-full h-screen bg-black"
      />
    </main>
  );
}