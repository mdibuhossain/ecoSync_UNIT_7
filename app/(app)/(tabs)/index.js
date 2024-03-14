import React from "react";
import { ScrollView, StyleSheet, View, FlatList, Image } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../components/RippleBtn";
import axios from "axios";
import DataPath from "../../../menu.json";

const index = () => {
  const [categories, setCategories] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [filteredMenu, setFilteredMenu] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setMenu(DataPath);
      setFilteredMenu(DataPath);
      setCategories([...new Set(DataPath.map((obj) => obj?.category))]);
    };
    fetchData();
  }, []);

  const handleFilterCategory = (e) => {
    setFilteredMenu([...menu?.filter((obj) => obj?.category === e)]);
  };

  const RenderItem = ({ cat }) => {
    console.log(cat);
    return (
      <View key={cat.index} style={styles.individualMenuItemContainer}>
        {/* <TouchableRipple
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
        </TouchableRipple> */}
        <Text>{cat?.name}</Text>
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
        data={filteredMenu}
        style={styles.menuContainer}
        renderItem={(cat) => <RenderItem key={cat.index} cat={cat.item} />}
      />
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
