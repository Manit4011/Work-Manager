"use client";
import React, { useState, useEffect } from 'react';
import UserContext from './userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/currentUser");
        if (res.status === 200) {
          console.log("user data", res.data);
          setUser(res.data);
        } else {
          toast.error("Failed to fetch user data");
          setUser(null);
        }
      } catch (error) {
        console.log("error in user provider", error);
        setUser(null);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;


// "use client";
// import React, { useState, useEffect } from 'react';
// import UserContext from './userContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined);

//   useEffect(() => {
//     // Define an inner async function
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/currentUser");
//         if (res.status === 200) {
//           console.log("user data", res.data);
//           setUser(res.data);
//         } else {
//           toast.error("Failed to fetch user data");
//           setUser(null);
//         }
//       } catch (error) {
//         console.log("error in user provider", error);
//         setUser(null);
//       }
//     };
    
//     if(!user){
//       fetchUser();
//     }
//   }, []);

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <UserContext.Provider value={{ user, setUser }}>
//         {children}
//       </UserContext.Provider>
//     </>
//   );
// };

// export default UserProvider;