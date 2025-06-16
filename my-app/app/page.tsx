'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 dark:from-[#1a0e2a] dark:to-[#2e1e47] text-gray-900 dark:text-white p-6">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-purple-700 dark:text-purple-300">
          Welcome to <span className="text-purple-900 dark:text-purple-400">Sparkr</span>
        </h1>
        <p className="text-lg sm:text-xl text-purple-800 dark:text-purple-200">
          A smarter way to connect, learn, and grow. Choose your role to get started.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/student"
            className="px-6 py-3 rounded-full bg-purple-700 text-white hover:bg-purple-800 transition text-base font-medium shadow-md"
          >
            I'm a Student
          </Link>
          <Link
            href="/teacher"
            className="px-6 py-3 rounded-full border border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition text-base font-medium shadow-md"
          >
            I'm a Teacher
          </Link>
        </div>
      </div>
    </main>
  );
}



