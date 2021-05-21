import React, { useContext, useState, useEffect } from "react";
import { auth, Providers,Database } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const loginWithEmail = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signupWithEmail = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }
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
      if (user) {
        Database.USERS.doc(user.uid).get().then(userD => {
          console.log(userD.data().fileLimit)
          if(userD.data().fileLimit)
          setCurrentUser({...user,...userD.data(),detailsGiven: true});
          else setCurrentUser({...user,detailsGiven: false});
        }).catch(err => {
        setCurrentUser({...user,detailsGiven: false});
        })
        
      }
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
    signupWithEmail,
    logOut,
    forgotPassword,
    signInWithGoogle,
    setCurrentUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
