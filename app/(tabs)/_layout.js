import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#3498db" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Estimate",
          headerShown: false,
          title: "Estimate",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard/index"
        options={{
          headerTitle: "Dashboard",
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
