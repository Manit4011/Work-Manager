'use client';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Mail, Lock } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/userContext';

const LoginPage = () => {
  const router = useRouter();
  
  // getting user context to set current user after login
  //this will allow us to access user data across the application
  // without needing to fetch it again
  
  const { setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/login', {
        email: loginData.email,
        password: loginData.password,
      });

      if (res.status === 200) {
        toast.success('Logged in successfully!');
        setLoginData({ email: '', password: '' });

        // fetch and set current user
        const userRes = await axios.get('/api/currentUser');
        if (userRes.status === 200) {
          setUser(userRes.data);
        }

        setTimeout(() => {
          router.push('/profile/user');
        }, 1500);
      } else {
        toast.error('Failed to log in.');
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          toast.error('Invalid email or password.');
        } else if (status === 404) {
          toast.error('User not found.');
        } else if (status === 400) {
          toast.error('Bad request. Please check your input.');
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Unexpected error occurred.');
        }
      } else {
        toast.error('Network error or server not responding.');
      }
    }
  };

  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-gray-100">
        <div className="bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="flex items-center border border-gray-700 rounded-xl px-3 py-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="w-full outline-none text-gray-100 placeholder-gray-500 bg-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="flex items-center border border-gray-700 rounded-xl px-3 py-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="w-full outline-none text-gray-100 placeholder-gray-500 bg-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
            >
              Log In
            </button>

            <p className="text-center text-sm text-gray-400">
              Forgot your password?{' '}
              <a href="#" className="text-blue-400 hover:underline">
                Reset here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;


// 'use client';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Mail, Lock } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';


// const LoginPage = () => {

//   const router = useRouter();


//   // Redirect to the user profile page after successful login


//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('/api/login', {
//         email: loginData.email,
//         password: loginData.password,
//       });

//       if (res.status === 200) {
//         toast.success('Logged in successfully!');
//         setLoginData({ email: '', password: '' });

//         setTimeout(() => {
//           router.push('/profile/user');
//         }, 1500);
//       } else {
//         toast.error('Failed to log in.');
//       }
//     } catch (error) {
//       if (error.response) {
//         const { status } = error.response;

//         if (status === 401) {
//           toast.error('Invalid email or password.');
//         } else if (status === 404) {
//           toast.error('User not found.');
//         } else if (status === 400) {
//           toast.error('Bad request. Please check your input.');
//         } else if (status === 500) {
//           toast.error('Server error. Please try again later.');
//         } else {
//           toast.error('Unexpected error occurred.');
//         }
//       } else {
//         toast.error('Network error or server not responding.');
//       }
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-gray-100">
//         <div className="bg-gray-900 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700">
//           <h2 className="text-3xl font-extrabold text-center text-white mb-6">Welcome Back</h2>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
//               <div className="flex items-center border border-gray-700 rounded-xl px-3 py-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
//                 <Mail className="w-5 h-5 text-gray-400 mr-2" />
//                 <input
//                   type="email"
//                   required
//                   value={loginData.email}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, email: e.target.value })
//                   }
//                   className="w-full outline-none text-gray-100 placeholder-gray-500 bg-transparent"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//               <div className="flex items-center border border-gray-700 rounded-xl px-3 py-2 bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500">
//                 <Lock className="w-5 h-5 text-gray-400 mr-2" />
//                 <input
//                   type="password"
//                   required
//                   value={loginData.password}
//                   onChange={(e) =>
//                     setLoginData({ ...loginData, password: e.target.value })
//                   }
//                   className="w-full outline-none text-gray-100 placeholder-gray-500 bg-transparent"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
//             >
//               Log In
//             </button>

//             <p className="text-center text-sm text-gray-400">
//               Forgot your password?{' '}
//               <a href="#" className="text-blue-400 hover:underline">
//                 Reset here
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginPage;