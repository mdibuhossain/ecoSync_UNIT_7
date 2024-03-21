import React from "react";
import { Button, FlatList, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../../components/RippleBtn";
import { Timestamp, orderBy } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { memoCollection } from "../../../../config/firebaseConfig";
import { TouchableRipple, Text } from "react-native-paper";
import HistoryModal from "../../../components/historyModal";

const History = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [sellHistory, setSellHistory] = React.useState([]);
  const [totalSellHistory, setTotalSellHistory] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [singleProduct, setSingleProduct] = React.useState({});
  const [totalSellProductQnt, setTotalSellProductQnt] = React.useState({});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const countFoods = (singleProduct, tmpQnt) => {
    const { date, id, sell, createdAt, ...products } = singleProduct;
    const keys = Object.keys(products);
    keys.map((key) => {
      tmpQnt[key] = tmpQnt[key]
        ? tmpQnt[key] + products[key]?.qnt
        : products[key]?.qnt;
    });
  };

  React.useEffect(() => {
    const mainQnt = {};
    sellHistory.map((item) => {
      countFoods(item, mainQnt);
    });
    // console.log(mainQnt);
    setTotalSellProductQnt(mainQnt);
  }, [sellHistory]);

  const convertTo12HourFormat = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${period}`;
    return twelveHourFormat;
  };

  const handleRangeDate = async (arg) => {
    setSelectedDate(`Last ${arg} days`);
    const offset = Number(arg) - 1;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startOfDate = Timestamp.fromDate(
      new Date(new Date(currentDate).setDate(currentDate.getDate() - offset))
    );
    const endOfDate = Timestamp.fromDate(
      new Date(currentDate.setHours(23, 59, 59, 999))
    );
    await fetchData(startOfDate, endOfDate);
  };

  const fetchData = async (startOfDate, endOfDate) => {
    try {
      const querySnapshot = await getDocs(
        query(
          memoCollection,
          where("createdAt", ">=", startOfDate),
          where("createdAt", "<=", endOfDate),
          orderBy("createdAt", "desc")
        )
      );
      const document = [];
      let totalCost = 0;
      querySnapshot.forEach((doc) => {
        const createdAt = convertTo12HourFormat(doc.data().createdAt.toDate());
        const date = doc.data().createdAt.toDate().toDateString();
        document.push({ id: doc.id, ...doc.data(), createdAt, date });
        totalCost += doc.data().sell;
      });
      setSellHistory(document);
      setTotalSellHistory(totalCost);
    } catch (err) {}
  };

  const handleConfirm = async (date) => {
    setTotalSellProductQnt({});
    try {
      setSelectedDate(new Date(date).toDateString());
      const startOfDate = Timestamp.fromDate(
        new Date(date.setHours(0, 0, 0, 0))
      );
      const endOfDate = Timestamp.fromDate(
        new Date(date.setHours(23, 59, 59, 999))
      );
      await fetchData(startOfDate, endOfDate);
    } catch (err) {
      console.error(err.message);
    } finally {
      hideDatePicker();
    }
  };

  const DatePicker = () => {
    return (
      <>
        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Button title="Choose date" onPress={showDatePicker} />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          timeZoneOffsetInMinutes={0}
        />
      </>
    );
  };

  const HistoryStack = ({ item }) => {
    return (
      <TouchableRipple
        style={{
          backgroundColor: "white",
          marginBottom: 8,
          paddingVertical: 15,
          paddingHorizontal: 12,
        }}
        onPress={() => {
          setSingleProduct(item);
          setModalVisible(true);
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            ৳{item?.sell}
          </Text>
          <Text style={{ fontSize: 12 }}>{item?.createdAt}</Text>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      {/* Order detials - Modal  */}
      <HistoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        singleProduct={singleProduct}
      />
      {/* Filter by buttons */}
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <RippleBtn value={"7d"} onPress={() => handleRangeDate(7)} />
        <RippleBtn value={"15d"} onPress={() => handleRangeDate(15)} />
        <RippleBtn value={"30d"} onPress={() => handleRangeDate(30)} />
        {DatePicker()}
      </View>
      {/* Total sell info and filter selection title */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ marginVertical: 12 }}>
          Total sell:{" "}
          <Text style={{ fontWeight: "bold" }}>৳{totalSellHistory}</Text>
        </Text>
        <Text>{selectedDate}</Text>
      </View>
      {/* Sell history details route */}
      {totalSellHistory > 0 && (
        <View
          style={{
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "productSellDetails",
                params: totalSellProductQnt,
              })
            }
          >
            <Text
              style={{
                backgroundColor: "lime",
                borderRadius: 10,
                overflow: "hidden",
                paddingHorizontal: 10,
                padding: 5,
              }}
            >
              View details
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Filtered orders */}
      <View style={{ marginBottom: 225 }}>
        <FlatList
          data={sellHistory}
          renderItem={({ index, item }) => (
            <HistoryStack key={index} item={item} />
          )}
        />
      </View>
    </View>
  );
};

export default History;
