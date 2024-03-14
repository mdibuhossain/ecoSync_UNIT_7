import React from "react";
import { ScrollView, StyleSheet, View, FlatList, Image } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../components/RippleBtn";

const categories = [
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
  "Pizza",
  "Burger",
  "Chawmin",
  "Juice",
  "Fries",
];
const col = 2;

const index = () => {
  const handleFilterCategory = (e) => {
    console.log(e);
  };

  const RenderItem = ({ cat }) => {
    return (
      <View key={cat.index} style={styles.individualMenuItemContainer}>
        <TouchableRipple
          onPress={() => {}}
          rippleColor="rgba(200, 200, 200, 0.5)"
          style={styles.menuItem}
        >
          <Image
            resizeMode="contain"
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikimedia-logo.png/768px-Wikimedia-logo.png",
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </TouchableRipple>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View style={styles.estimateDisplay}>
        <Text style={styles.innerEstimateBox}>Calculation</Text>
      </View>
      {/* Category list */}
      <View style={{ marginVertical: 10 }}>
        <FlatList
          data={categories}
          renderItem={(cat) => (
            <RippleBtn
              key={cat.index}
              value={cat.item}
              onPress={handleFilterCategory}
            />
          )}
          horizontal={true}
        />
      </View>

      <FlatList
        numColumns={3}
        data={categories}
        style={styles.menuContainer}
        renderItem={(cat) => <RenderItem cat={cat} />}
      />

      {/* <ScrollView>
        <View style={styles.menuContainer}>
          {categories?.map((cat, index) => (
            <View key={index} style={{ width: 100 / col + "%" }}>
              <View
                style={{ padding: 5, ...styles.individualMenuItemContainer }}
              >
                <Text>{cat}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView> */}
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
  menuContainer: {
    marginBottom: 145,
  },
  individualMenuItemContainer: {
    flex: 1,
    height: 100,
    backgroundColor: "rgb(231, 231, 231)",
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    overflow: "hidden",
    borderRadius: 10,
    elevation: 2,
  },
  menuItem: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
