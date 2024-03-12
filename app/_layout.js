import React from "react";
import { Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { Text } from "react-native";
import { AuthProvider } from "../contexts/authContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
