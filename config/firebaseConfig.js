import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfSagv8McLdJbyNMl9hirZyaQK3P5WPoA",
  authDomain: "ecosync-99117.firebaseapp.com",
  projectId: "ecosync-99117",
  storageBucket: "ecosync-99117.appspot.com",
  messagingSenderId: "62139487710",
  appId: "1:62139487710:web:c98cdb556039ce2097394f",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const menuCollection = collection(FIREBASE_DB, "menu");
export const reportCollection = collection(FIREBASE_DB, "report");
export const volunteerCollection = collection(
  FIREBASE_DB,
  "volunteerRegistration"
);
export const memoCollection = collection(FIREBASE_DB, "memo");
