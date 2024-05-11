import React from "react";
import {
  Button,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Timestamp, orderBy } from "firebase/firestore";
import { volunteerCollection } from "../../../../config/firebaseConfig";
import { Text } from "react-native-paper";
import { addDoc } from "@firebase/firestore";
import { AuthContext } from "../../../../contexts/authContext";

const Volunteer = () => {
  const { user } = React.useContext(AuthContext);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date) => {
    try {
      setSelectedDate(new Date(date).toDateString());
      const startOfDate = Timestamp.fromDate(
        new Date(date.setHours(0, 0, 0, 0))
      );
      const endOfDate = Timestamp.fromDate(
        new Date(date.setHours(23, 59, 59, 999))
      );
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
          <Button title="Choose event date" onPress={showDatePicker} />
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        name: name,
        age: age,
        contact: contact,
        email: user?.email,
        eventDate: selectedDate,
      };
      addDoc(volunteerCollection, data).then((ref) => {
        Alert.alert("Successfully added!!");
        setName("");
        setAge("");
        setContact("");
        setSelectedDate("");
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {DatePicker()}
      <Text style={{ fontSize: 20, marginBottom: 20 }}>{selectedDate}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.labelText}>Full Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Your name"
        />
        <Text style={styles.labelText}>Age:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="Your age"
        />
        <Text style={styles.labelText}>Contact:</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setContact}
          value={contact}
          placeholder="Your contact number"
        />
        <Text style={styles.labelText}>Email:</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          value={user?.email}
          aria-disabled={true}
        />
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>
            {loading ? "Loading..." : "Register"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: "80%",
  },
  labelText: {
    fontSize: 12,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "orange",
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
  },
  imgBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 1,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Volunteer;
