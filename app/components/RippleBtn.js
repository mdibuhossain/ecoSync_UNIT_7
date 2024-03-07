import { StyleSheet, View } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";

const RippleBtn = ({ onPress, value }) => {
  return (
    <View style={styles.catBtnContainer}>
      <TouchableRipple
        onPress={() => onPress(value)}
        rippleColor="rgba(0, 0, 0, 0.5)"
        style={styles.catBtn}
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
    backgroundColor: "#fff", // Change the background color as needed
  },
  label: {
    color: "#000", // Change the text color as needed
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RippleBtn;
