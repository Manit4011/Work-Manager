"use client";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signup from '../../assets/signup.svg';
import Image from 'next/image';
import axios from 'axios';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    about: '',
    profileUrl: ''
  });


  const validateForm = () => {
    const { username, email, password, about, profileUrl } = formData;
    if (!username.trim() || !email.trim() || !password.trim() || !about.trim() || !profileUrl.trim()) {
      toast.error('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual API route
      const res = await axios.post("api/users", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        about: formData.about,
        profileUrl: formData.profileUrl
      });
      if (res.status === 200) {
        toast.success('Signed up successfully!');
        setFormData({
          username: '',
          email: '',
          password: '',
          about: '',
          profileUrl: ''
        });
      } else {
        toast.error('Failed to sign up.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message || 'Username or email already taken.');
      } else {
        toast.error('An error occurred during sign-up.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      about: '',
      profileUrl: ''
    });
    toast.info('Form reset.');
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="grid grid-cols-12 justify-center">
        <div className="col-span-6 col-start-4 shadow-lg shadow-blue-500 p-6 bg-gray-900 text-white rounded-xl">
          <div className='w-full'>
            <Image src={signup} alt="signup" className='w-[80%] h-28 mx-auto' />
          </div>
          <h1 className="text-center text-2xl font-bold text-blue-400 mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">

              <div>
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                  className="w-full p-2.5 rounded-md bg-gray-800 border border-blue-500 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="w-full p-2.5 rounded-md bg-gray-800 border border-blue-500 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  className="w-full p-2.5 rounded-md bg-gray-800 border border-blue-500 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={(e) => {
                    setFormData({ ...formData, about: e.target.value });
                  }}
                  rows="4"
                  className="w-full p-2.5 rounded-md bg-gray-800 border border-blue-500 focus:ring-blue-400 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 font-medium">Profile URL</label>
                <input
                  type="text"
                  name="profileURL"
                  value={formData.profileUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, profileUrl: e.target.value });
                  }}
                  className="w-full p-2.5 rounded-md bg-gray-800 border border-blue-500 focus:ring-blue-400 focus:outline-none"/>
              </div>

            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 active:scale-95 transition-transform duration-100 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 active:scale-95 transition-transform duration-100 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
