import React from "react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/authContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
