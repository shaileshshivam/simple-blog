import React, { useState, createContext, useEffect } from "react";
import firebase, { auth, firestore } from "./firebase";

export const UserContext = createContext({
  user: null,
  pending: true,
  isLoggedIn: false,
});

const UserProvider = (props) => {
  const [user, setUser] = useState({
    user: null,
    pending: true,
    isLoggedIn: false,
  });

  const { children } = props;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          user: user,
          pending: false,
          isLoggedIn: true,
        });
      } else {
        setUser({
          user: null,
          pending: false,
          isLoggedIn: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
