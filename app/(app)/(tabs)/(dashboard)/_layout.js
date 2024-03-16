import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const DashBoardLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="history" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "History",
            title: "History",
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DashBoardLayout;
