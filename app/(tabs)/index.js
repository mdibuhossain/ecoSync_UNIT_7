import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../components/RippleBtn";

const index = () => {
  const handleFilterCategory = (e) => {
    console.log(e);
  };
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={styles.estimateDisplay}>
        <Text style={styles.innerEstimateBox}>bal sjdkfljksd</Text>
      </View>
      {/* Category list */}
      <ScrollView
        horizontal={true}
        style={{ marginTop: 10, paddingVertical: 5 }}
      >
        {/* Ripple button */}
        <RippleBtn value="Pizza" onPress={handleFilterCategory} />
        <RippleBtn value="Burgar" onPress={handleFilterCategory} />
        <RippleBtn value="Chawmin" onPress={handleFilterCategory} />
        <RippleBtn value="Juice" onPress={handleFilterCategory} />
        <RippleBtn value="Fires" onPress={handleFilterCategory} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  estimateDisplay: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    paddingTop: 60,
  },
  innerEstimateBox: {
    marginLeft: "auto",
    fontSize: 25,
    fontWeight: "700",
  },
});

export default index;
