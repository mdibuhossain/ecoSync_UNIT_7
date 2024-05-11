import React from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../config/firebaseConfig";
import { AuthContext } from "../../contexts/authContext";

export default function AuthScreen() {
  const { user, setUser, authError, setAuthError } =
    React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmationPassword, setConfirmationPassword] = React.useState("");
  const [isLoginUI, setIsLoginUI] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(false);

  // console.log(authError);

  const handleSignin = async () => {
    setAuthLoading(true);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleSignup = async () => {
    setAuthLoading(true);
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EcoSync</Text>
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isLoginUI ? "Sign in" : "Sign up"}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        {!isLoginUI && (
          <TextInput
            style={styles.input}
            value={confirmationPassword}
            onChangeText={setConfirmationPassword}
            placeholder="Confirm password"
            secureTextEntry
          />
        )}
        <View style={styles.buttonContainer}>
          {isLoginUI ? (
            <Button
              onPress={handleSignin}
              title={authLoading ? "Loading..." : "Sign in"}
            />
          ) : (
            <Button
              onPress={handleSignup}
              title={authLoading ? "Loading..." : "Sign up"}
            />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text
            style={styles.toggleText}
            onPress={() => setIsLoginUI(!isLoginUI)}
          >
            {isLoginUI
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  logo: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight: "900",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
