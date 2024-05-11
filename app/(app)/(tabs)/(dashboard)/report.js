import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onSnapshot, addDoc } from "@firebase/firestore";
import {
  FIREBASE_STORAGE,
  reportCollection,
} from "../../../../config/firebaseConfig";
import { AuthContext } from "../../../../contexts/authContext";

const Report = () => {
  const { user } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [issueType, setIssueType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        selectionLimit: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {}
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `report photos/${location}.${image.split(".").pop()}`;
    const storageRef = ref(FIREBASE_STORAGE, filename);
    let result = "";
    await uploadBytes(storageRef, blob);
    const photoURL = await getDownloadURL(storageRef);
    setPhoto(photoURL);
    return photoURL;
  };

  const handleSubmit = async (flag) => {
    try {
      setUploading(true);
      const photoURL = await uploadImage();
      let data = {};
      if (!flag) {
        data = {
          issueType: issueType,
          location: location,
          photoURL: photoURL,
          description: description,
          email: user?.email,
        };
      } else {
        data = {
          issueType: issueType,
          location: location,
          photoURL: photoURL,
          description: description,
        };
      }
      addDoc(reportCollection, data).then((ref) => {
        Alert.alert("Successfully added!!");
        setIssueType("");
        setLocation("");
        setDescription("");
        setImage(null);
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setUploading(false);
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
      <View style={styles.innerContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
        )}
        <Text style={styles.labelText}>Location:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder="Type manually"
        />
        <Text style={styles.labelText}>Issue Type:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIssueType}
          value={issueType}
          placeholder="Overflowing bins, littering, illegal dumping, or damanged infrastructure"
        />
        <Text style={styles.labelText}>Description:</Text>
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Describe the issue"
        />
        <Pressable style={styles.imgBtn} onPress={pickImage}>
          <Text>Choose Menu photo</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={() => handleSubmit(false)}>
          <Text style={styles.btnText}>
            {uploading ? "Loading..." : "SUBMIT REPORT"}
          </Text>
        </Pressable>
        <Pressable
          style={{ ...styles.submitBtn, backgroundColor: "red" }}
          onPress={() => handleSubmit(true)}
        >
          <Text style={styles.btnText}>
            {uploading ? "Loading..." : "SUBMIT AS ANONYMOUS"}
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

export default Report;
