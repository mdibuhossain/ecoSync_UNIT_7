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
          name="report" // This is the name of the page and must match the url from immediate root
          options={{
            drawerLabel: "Issue Report",
            title: "Issue Report",
          }}
        />
        <Drawer.Screen
          name="volunteer" // This is the name of the page and must match the url from immediate root
          options={{
            drawerLabel: "Volunteer Register",
            title: "Volunteer Register",
          }}
        />
        <Drawer.Screen
          name="profile" // This is the name of the page and must match the url from immediate root
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
