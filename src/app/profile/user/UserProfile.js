'use client';
import UserContext from '@/context/userContext';
import React, { useContext } from 'react';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const currentUser = user?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      {currentUser ? (
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 text-center">
          <img
            src={currentUser.profileUrl || '/default-profile.png'}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-amber-500 shadow-md object-cover"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">{currentUser.name}</h2>
          <p className="text-gray-500 mb-2">{currentUser.email}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">About</h3>
            <p className="text-gray-600 mt-1">
              {currentUser.about || 'No additional information provided.'}
            </p>
          </div>
          <div className="mt-6">
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300 shadow">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-600 text-lg font-medium">No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
