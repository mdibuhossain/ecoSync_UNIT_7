import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { TouchableRipple, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../components/RippleBtn";
import { onSnapshot, addDoc, Timestamp } from "@firebase/firestore";
import Svg, { Path } from "react-native-svg";
import { menuCollection, memoCollection } from "../../../config/firebaseConfig";
import { AuthContext } from "../../../contexts/authContext";

const index = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [filteredMenu, setFilteredMenu] = React.useState([]);
  const [totalCost, setTotalCost] = React.useState(0);
  const [estimate, setEstimate] = React.useState({});
  const [estimateSerial, setEstimateSerial] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sellLoading, setSellLoading] = React.useState(false);

  const fetchData = () => {
    setIsLoading(true);
    try {
      if (user) {
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
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

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
    const productName = `${cat?.name} ${cat?.unit}`;
    const tmpEstimateSerial = [...estimateSerial];
    tmpEstimateSerial.push(productName);
    cashMemo[productName] = {
      qnt:
        cashMemo[productName] !== undefined
          ? (cashMemo[productName].qnt || 0) + 1
          : 1,
      price: cat?.price,
      unit: cat?.unit,
    };
    setEstimateSerial(tmpEstimateSerial);
    setEstimate(cashMemo);
    // console.log(cashMemo);
  };

  const handleResetMenuSelection = () => {
    setTotalCost(0);
    setEstimate({});
    setEstimateSerial([]);
  };

  const handlePopOrder = () => {
    if (estimateSerial.length > 0) {
      const tmpEstimate = { ...estimate };
      const tmpEstimateSerial = estimateSerial;
      const lastProduct = tmpEstimateSerial.pop();
      setEstimateSerial(tmpEstimateSerial);
      tmpEstimate[lastProduct].qnt--;
      setTotalCost(totalCost - tmpEstimate[lastProduct].price);
      if (tmpEstimate[lastProduct].qnt === 0) {
        delete tmpEstimate[lastProduct];
      }
      setEstimate(tmpEstimate);
      // console.log(tmpEstimate);
      // console.log(tmpEstimateSerial);
    }
  };

  const handleSubmitCashMemo = async () => {
    setSellLoading(true);
    try {
      if (user) {
        const result = await addDoc(memoCollection, {
          ...estimate,
          createdAt: Timestamp.now(),
          sell: totalCost,
        });
        // console.log(result);
        if (result) {
          setTotalCost(0);
          setEstimate({});
          setEstimateSerial([]);
        }
      }
    } catch (err) {
    } finally {
      setSellLoading(false);
    }
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
            {estimate[`${cat?.name} ${cat?.unit}`] && (
              <View
                style={{
                  position: "absolute",
                  zIndex: 100,
                  left: 0,
                  bottom: 0,
                  backgroundColor: "green",
                  borderRadius: 100,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 8, color: "white" }}>
                  {estimate[`${cat?.name} ${cat?.unit}`]?.qnt}
                </Text>
              </View>
            )}
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
                source={{
                  uri:
                    cat?.photo?.length > 0
                      ? cat?.photo
                      : "https://img.freepik.com/premium-vector/pizza-pixel-art-piece-pizza-is-pixelated-fast-food-isolated_182604-226.jpg",
                }}
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
      {/* Calculation display */}
      <View style={styles.estimateDisplay}>
        <Text style={styles.innerEstimateBox}>{totalCost}</Text>
      </View>
      {/* Controller */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {/* Submit button */}
        <TouchableOpacity
          style={{
            borderRadius: 10,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFC300",
          }}
          onPress={handleSubmitCashMemo}
        >
          <Text
            style={{ fontSize: 12, paddingHorizontal: 15, fontWeight: "bold" }}
          >
            {sellLoading ? "Loading..." : "Done"}
          </Text>
        </TouchableOpacity>
        {/* Reset and pop button */}
        <View style={{ flexDirection: "row", gap: 20 }}>
          {/* Reset button */}
          <TouchableOpacity onPress={handleResetMenuSelection}>
            <View style={{ width: 30, height: 30 }}>
              <Svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="m3.508 6.726c1.765-2.836 4.911-4.726 8.495-4.726 5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497-3.037 0-5.704 1.597-7.206 3.995l1.991.005c.414 0 .75.336.75.75s-.336.75-.75.75h-4.033c-.414 0-.75-.336-.75-.75v-4.049c0-.414.336-.75.75-.75s.75.335.75.75zm8.492 2.272c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z"
                  fill-rule="nonzero"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          {/* Pop button */}
          <TouchableOpacity onPress={handlePopOrder}>
            <View style={{ width: 30, height: 30 }}>
              <Svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z"
                  fill-rule="nonzero"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>Loading...</Text>
        </View>
      )}
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
      {/* Menu list */}
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
    marginBottom: 190,
  },
  individualMenuItemContainer: {
    flex: 1,
    height: 150,
    maxWidth: 100 / 2.185 + "%",
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
