// components/JitsiMeet.js
import { useEffect, useRef } from 'react';

const JitsiMeet = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const domain = 'meet.jit.si'; // Or your own Jitsi server
      const options = {
        roomName: roomName || 'MyTestRoom',
        parentNode: jitsiContainerRef.current,
        width: '100%',
        height: 600,
      };
      new window.JitsiMeetExternalAPI(domain, options);
    }
  }, [roomName]);

  return <div ref={jitsiContainerRef} />;
};

export default JitsiMeet;
