import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="productSellDetails"
        options={{
          title: "Sell details",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default AppLayout;
