import React from "react";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const SellHistory = () => {
  const item = useLocalSearchParams();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={Object.keys(item)}
        renderItem={({ item: key, index }) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text>{key}</Text>
            <Text>{item[key]}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SellHistory;
