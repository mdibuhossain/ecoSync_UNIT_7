import React from "react";
import { useSegments, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";

const useAuth = () => {
  const router = useRouter();
  const rootSegment = useSegments()[0];
  const [user, setUser] = React.useState(null);
  const [authError, setAuthError] = React.useState("");
  const [authSuccess, setAuthSuccess] = React.useState("");
  const [userLoading, setUserLoading] = React.useState(true);

  // console.log(rootSegment);

  React.useEffect(() => {
    if (!user && !rootSegment !== "(auth)") {
      router.replace("(auth)/login");
    } else if (user && rootSegment !== "(app)") {
      router.replace("/");
    }
  }, [user, rootSegment]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return {
    user,
    authError,
    userLoading,
    authSuccess,
    setUser,
    setAuthError,
    setAuthSuccess,
  };
};

export default useAuth;
