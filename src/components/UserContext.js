import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Load user from local storage on initial render
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const users = [
    { email: "adminkriss@gmail.com", password: "admin2308", role: "admin" },
    { email: "bhartiteacher@gmail.com", password: "teacher123", role: "teacher" },
    { email: "krupateacher@gmail.com", password: "teacher12345", role: "teacher" },
    { email: "kamal@gmail.com", password: "student123", role: "student" },
    { email: "raj@gmail.com", password: "student123", role: "student" }
  ];

  

  const loginUser = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user)); // Storing the user in local storage
      return user;
    }
    return null;
  };

  const logoutUser = () => {
    setCurrentUser(null); // Clear user data on logout
    // Optionally, clear local storage or any other cleanup
    localStorage.removeItem('user'); // Example
};

  return (
    <UserContext.Provider value={{ currentUser, loginUser, logoutUser ,users  }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
