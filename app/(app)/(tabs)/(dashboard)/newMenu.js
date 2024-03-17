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
  menuCollection,
} from "../../../../config/firebaseConfig";

const NewMenu = () => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [price, setPrice] = React.useState("");
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
    const filename = `menu photos/${name}.${image.split(".").pop()}`;
    const storageRef = ref(FIREBASE_STORAGE, filename);
    let result = "";
    await uploadBytes(storageRef, blob);
    const photoURL = await getDownloadURL(storageRef);
    setPhoto(photoURL);
    return photoURL;
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      const photoURL = await uploadImage();
      const data = {
        category: category.toLowerCase(),
        name,
        photo: photoURL,
        price: Number(price),
        subCategory: subCategory.toLowerCase(),
        unit,
      };
      addDoc(menuCollection, data).then((ref) => {
        Alert.alert("Successfully added!!");
        // setName("");
        // setCategory("");
        // setSubCategory("");
        // setPhoto("");
        // setImage("");
        // setPrice("");
        // setUnit("");
      });
    } catch (err) {
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
        <Text style={styles.labelText}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Ex: Mixed Chowmein"
        />
        <Text style={styles.labelText}>Category:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCategory}
          value={category}
          placeholder="Ex: heavy meal"
        />
        <Text style={styles.labelText}>Sub category:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSubCategory}
          value={subCategory}
          placeholder="Ex: chinese"
        />
        <Text style={styles.labelText}>Unit:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUnit}
          value={unit}
          placeholder="Ex: half"
        />
        <Text style={styles.labelText}>Price:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
          placeholder="Ex: 59"
        />
        <Pressable style={styles.imgBtn} onPress={pickImage}>
          <Text>Choose Menu photo</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>{uploading ? "Loading..." : "ADD"}</Text>
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

export default NewMenu;
