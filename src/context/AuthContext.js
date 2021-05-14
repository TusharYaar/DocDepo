import React, { useContext, useState, useEffect } from "react";
import { auth, Providers } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const loginWithEmail = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    return auth.signInWithPopup(Providers.google);
  };
  const isUser = () => {
    if(currentUser && currentUser !== null && currentUser !== "NoUser")
          return true;
    return false;
  }
  const logOut = () => {
    return auth.signOut();
  };
  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log(user)
      if (user) setCurrentUser(user);
      else {
        setCurrentUser("NoUser");
        console.log("Setting to No User");
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    isUser,
    loginWithEmail,
    logOut,
    forgotPassword,
    signInWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
