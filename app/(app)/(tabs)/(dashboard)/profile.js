import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../config/firebaseConfig";
import { AuthContext } from "../../../../contexts/authContext";

const Profile = () => {
  const { setUser } = useContext(AuthContext);
  const handleSignout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {});
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Logout" onPress={handleSignout} />
    </View>
  );
};

export default Profile;
