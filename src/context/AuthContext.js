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

  const signOut = () => {
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
        console.log("Setting to new User");
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    loginWithEmail,
    signOut,
    forgotPassword,
    signInWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
