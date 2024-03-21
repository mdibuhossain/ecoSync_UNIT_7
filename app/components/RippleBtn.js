import { StyleSheet, View } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";

const RippleBtn = ({ onPress, value, selected, index }) => {
  return (
    <View style={styles.catBtnContainer}>
      <TouchableRipple
        onPress={() => onPress(value, index)}
        rippleColor="rgba(0, 0, 0, 0.2)"
        style={{
          ...styles.catBtn,
          backgroundColor:
            typeof index === "number"
              ? selected === index
                ? "lime"
                : "white"
              : "white",
        }}
      >
        <Text style={styles.label}>{value}</Text>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  catBtnContainer: {
    marginRight: 10,
    borderRadius: 50,
    overflow: "hidden",
  },
  catBtn: {
    borderRadius: 50, // Adjust the border radius as needed
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  label: {
    color: "#000", // Change the text color as needed
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RippleBtn;
