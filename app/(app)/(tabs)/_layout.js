import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3498db",
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Estimate",
          headerShown: false,
          title: "Estimate",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="swip"
        options={{
          headerTitle: "Swip",
          headerShown: false,
          title: "Swip",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="(dashboard)"
        options={{
          headerTitle: "Dashboard",
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
