import React from "react";
import { Button, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import RippleBtn from "../../../components/RippleBtn";

const History = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    hideDatePicker();
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
        />
      </>
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", columnGap: 5 }}>
        <RippleBtn value={"7d"} onPress={() => {}} />
        <RippleBtn value={"15d"} onPress={() => {}} />
        <RippleBtn value={"30d"} onPress={() => {}} />
        {DatePicker(0)}
      </View>
    </View>
  );
};

export default History;
