'use client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserContext from '@/context/userContext';
import { ReactTyped } from 'react-typed'; // ✅ Corrected import

const HomePage = () => {
  const { user } = useContext(UserContext);
  const currentUser = user?.user;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        {isMounted && (
          <ReactTyped
            strings={[
              currentUser ? `Welcome, ${currentUser.name} 👋` : 'Welcome 👋',
              'Manage your tasks efficiently',
              'Stay productive with Work Manager'
            ]}
            typeSpeed={60}
            backSpeed={30}
            loop
          />
        )}
      </h1>

      <p className="text-gray-700 text-lg md:text-xl max-w-xl mb-8">
        Manage your tasks efficiently with{' '}
        <span className="font-semibold text-amber-600">Work Manager</span>. Create, track, and complete your daily goals.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/tasks">
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md">
            Go to Tasks
          </button>
        </Link>

        <Link href="/profile">
          <button className="bg-white hover:bg-gray-100 text-amber-600 border border-amber-400 px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
