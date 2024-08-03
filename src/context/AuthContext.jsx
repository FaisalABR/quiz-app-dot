import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authFirebase } from "../firebase";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(authFirebase, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error));
  };

  const signIn = async (email, password) => {
    try {
      await setPersistence(authFirebase, browserLocalPersistence);
      console.log("set persistence");
      const res = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(authFirebase);
      console.log("Sign out success");
    } catch (error) {
      console.log("Sign out failed");
    }
  };

  useEffect(() => {
    const unsubscrice = onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        setIsAuth(user);
      } else {
        setIsAuth(null);
      }
      setLoading(false);
    });

    return () => unsubscrice();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, loading, signUp, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
