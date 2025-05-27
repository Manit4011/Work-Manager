"use client";
import { createContext } from 'react';

// This context is used to manage user state across the application
// It provides a way to access and update the user information globally
// The default value is an object with user set to null and setUser as a placeholder function
const UserContext = createContext({
  user: null,
  setUser: () => {}
});

export default UserContext;


// "use client";
// import { createContext } from 'react';

// const UserContext = createContext({})

// export default UserContext;