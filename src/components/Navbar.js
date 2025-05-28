'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import UserContext from '@/context/userContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const actualUser = user?.user;
  const router = useRouter();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/logout');
      if (res.status === 200) {
        setUser(null);
        toast.success("Logout successful!");
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        toast.error("Failed to logout!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout!");
    }
  };

  return (
    <>
      
      <nav className="fixed w-full top-0 left-0 z-50 bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-cyan-400 font-bold text-xl tracking-widest hover:text-cyan-300 transition">
              WORK MANAGER
            </Link>

            <div className="hidden md:flex space-x-6 text-white font-medium">
              <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
              <Link href="/add-task" className="hover:text-cyan-400 transition">Add Tasks</Link>
              <Link href="/show-task" className="hover:text-cyan-400 transition">Show Tasks</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {actualUser ? (
                <>
                  <Link href="/profile/user" className="flex items-center space-x-2 bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-400 transition">
                    <img
                      src={actualUser.profileUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden sm:inline">Welcome, {actualUser.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-400 transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="bg-cyan-500 text-black py-2 px-4 rounded-full hover:bg-cyan-400 transition">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-cyan-500 text-black py-2 px-4 rounded-full hover:bg-cyan-400 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setNavOpen(!navOpen)}>
                {navOpen ? (
                  <HiOutlineX className="text-white text-2xl" />
                ) : (
                  <HiOutlineMenuAlt3 className="text-white text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="md:hidden bg-black/90 text-white px-4 py-6 space-y-4">
            <Link href="/" className="block hover:text-cyan-400">Home</Link>
            <Link href="/add-task" className="block hover:text-cyan-400">Add Task</Link>
            <Link href="/show-task" className="block hover:text-cyan-400">Show Task</Link>
            {actualUser ? (
              <>
                <Link href="/profile/user" className="block hover:text-cyan-400">Profile</Link>
                <button onClick={handleLogout} className="text-white rounded-4xl bg-red-500 px-4 py-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block hover:text-cyan-400">Login</Link>
                <Link href="/signup" className="block hover:text-cyan-400">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;


// 'use client';
// import { useContext, useState } from 'react';
// import Link from 'next/link';
// import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
// import UserContext from '@/context/userContext';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { useRouter } from 'next/navigation';

// const Navbar = () => {
//   const [navOpen, setNavOpen] = useState(false);
//   const router = useRouter();

//   const { user } = useContext(UserContext);
//   const actualUser = user?.user; // Safe access to inner user


//   const handleLogout = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post('/api/logout');
//       if (res.status === 200) {
//         toast.success("Logout successful!");
//         setTimeout(() => {
//           router.push('/login');
//         }, 1500);
//       } else {
//         toast.error("Failed to logout!");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//       toast.error("failed to logout!!");
//     }
//   }

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <nav className="fixed w-full top-0 left-0 z-50 bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link href="/" className="text-cyan-400 font-bold text-xl tracking-widest hover:text-cyan-300 transition">
//               WORK MANAGER
//             </Link>

//             <div className="hidden md:flex space-x-6 text-white font-medium">
//               <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
//               <Link href="/add-task" className="hover:text-cyan-400 transition">Add Tasks</Link>
//               <Link href="/show-task" className="hover:text-cyan-400 transition">Show Tasks</Link>
//             </div>

//             <div className="hidden md:flex items-center space-x-4">
//               {actualUser ? (
//                 <>
//                   <Link href="/profile/user" className="flex items-center space-x-2 bg-cyan-500 text-white py-2 px-4 rounded-full hover:bg-cyan-400 transition">
//                     <img
//                       src={actualUser.ProfileUrl}
//                       alt="Profile"
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                     <span className="hidden sm:inline">Welcome, {actualUser.name}</span>
//                   </Link>
//                   <Link href="/logout" onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-400 transition">
//                     Logout
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login" className="bg-cyan-500 text-black py-2 px-4 rounded-full hover:bg-cyan-400 transition">
//                     Login
//                   </Link>
//                   <Link href="/signup" className="bg-cyan-500 text-black py-2 px-4 rounded-full hover:bg-cyan-400 transition">
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>

//             <div className="md:hidden flex items-center">
//               <button onClick={() => setNavOpen(!navOpen)}>
//                 {navOpen ? (
//                   <HiOutlineX className="text-white text-2xl" />
//                 ) : (
//                   <HiOutlineMenuAlt3 className="text-white text-2xl" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {navOpen && (
//           <div className="md:hidden bg-black/90 text-white px-4 py-6 space-y-4">
//             <Link href="/" className="block hover:text-cyan-400">Home</Link>
//             <Link href="/add-task" className="block hover:text-cyan-400">Add Task</Link>
//             <Link href="/show-task" className="block hover:text-cyan-400">Show Task</Link>
//             {actualUser ? (
//               <>
//                 <Link href="/profile/user" className="block hover:text-cyan-400">Profile</Link>
//                 <button className='text-white rounded-4xl bg-red-500'>Logout</button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className="block hover:text-cyan-400">Login</Link>
//                 <Link href="/signup" className="block hover:text-cyan-400">Sign Up</Link>
//               </>
//             )}
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;
