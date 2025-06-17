'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StartPage() {
  const router = useRouter();
  const [className, setClassName] = useState('');

  const goToMeeting = () => {
    if (!className.trim()) {
      alert('Please enter a class name');
      return;
    }
    // Navigate to video page with the class name as a query parameter
    router.push(`/teacherJoin/videoPage?room=${encodeURIComponent(className)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-purple-50 p-6">
      <input
        type="text"
        placeholder="Enter Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="border border-purple-300 rounded px-4 py-2 w-64"
      />
      <button
        onClick={goToMeeting}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        Start Meeting
      </button>
    </div>
  );
}