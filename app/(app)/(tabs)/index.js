import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../components/RippleBtn";
import { onSnapshot } from "firebase/firestore";
import { menuCollection } from "../../../config/firebaseConfig";

const index = () => {
  const [categories, setCategories] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [filteredMenu, setFilteredMenu] = React.useState([]);
  const [totalCost, setTotalCost] = React.useState(0);
  const [estimate, setEstimate] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = () => {
    onSnapshot(menuCollection, {
      next: (snapshot) => {
        const tmpMenu = [];
        snapshot.docs.forEach((doc) => {
          tmpMenu.push({ id: doc.id, ...doc.data() });
        });
        setMenu(tmpMenu);
        setFilteredMenu(tmpMenu);
      },
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  console.log(menu);
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const tmp = [...new Set(menu?.map((obj) => obj?.category))];
    setCategories(tmp);
  }, [menu]);

  const handleFilterCategory = (e) => {
    const tmp = [...menu?.filter((obj) => obj?.category === e)];
    setFilteredMenu(tmp);
  };

  const handleCount = (cat) => {
    setTotalCost(Number(totalCost) + Number(cat?.price));
    let cashMemo = { ...estimate };
    cashMemo[cat.name] =
      cashMemo[cat.name] !== undefined ? cashMemo[cat.name] + 1 : 1;
    setEstimate(cashMemo);
    console.log(cashMemo);
  };
  const RenderItem = ({ cat }) => {
    return (
      <View key={cat.index} style={styles.individualMenuItemContainer}>
        <TouchableOpacity
          onPress={() => handleCount(cat)}
          activeOpacity={0.6}
          style={styles.menuItem}
        >
          <View
            style={{
              flex: 1,
              position: "relative",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {cat?.name}
              </Text>
            </View>
            <View style={{ flex: 3, marginBottom: 8 }}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/Mixed Chowmein.png")}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "#f1f0ff",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {cat?.unit}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                ৳{cat?.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View style={styles.estimateDisplay}>
        <Text style={styles.innerEstimateBox}>{totalCost}</Text>
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
        numColumns={2}
        data={filteredMenu}
        style={styles.menuContainer}
        renderItem={(cat) => <RenderItem key={cat.index} cat={cat.item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    height: 150,
    maxWidth: 100 / 2 + "%",
    backgroundColor: "rgb(231, 231, 231)",
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    overflow: "hidden",
    borderRadius: 10,
    elevation: 3,
  },
  menuItem: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default index;
