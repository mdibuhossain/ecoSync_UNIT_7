import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/authContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
