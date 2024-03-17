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
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const NewMenu = () => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [price, setPrice] = React.useState("");
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
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `${name}.${image.split(".").pop()}`;
  };

  return (
    <View
      style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}
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
        <Pressable style={styles.submitBtn} onPress={uploadImage}>
          <Text style={styles.btnText}>ADD</Text>
        </Pressable>
      </View>
    </View>
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
  },
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "orange",
    marginTop: 10,
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
