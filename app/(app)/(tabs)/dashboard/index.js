import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../config/firebaseConfig";
import { AuthContext } from "../../../../contexts/authContext";

const Dashboard = () => {
  const { setUser } = useContext(AuthContext);
  const handleSignout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {});
  };
  return (
    <SafeAreaView>
      <View>
        <Text>This is Dashboard</Text>
        <Button title="Logout" onPress={handleSignout} />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
