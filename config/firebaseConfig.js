import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCbHY1W6hz6AIkKnkxMmYq0I_anzVxFkM",
  authDomain: "krunchmanagement.firebaseapp.com",
  projectId: "krunchmanagement",
  storageBucket: "krunchmanagement.appspot.com",
  messagingSenderId: "597393762285",
  appId: "1:597393762285:web:c3729bce0d4a524690e9e4",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
