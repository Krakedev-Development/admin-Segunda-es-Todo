// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyD3tzUWpDwEMzeBnH0Zc1Z4_NFV_noTyjc",
  authDomain: "segundaestodoapp.firebaseapp.com",
  projectId: "segundaestodoapp",
  storageBucket: "segundaestodoapp.appspot.com",
  messagingSenderId: "917966498579",
  appId: "1:917966498579:web:e7c247c1f79709056048e6",
  measurementId: "G-NMH9NR2JMD",
};
export const loadConfiguration = () => {
  // Alert.alert("carga la configuracio!!!");
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
  initializeApp(firebaseConfig);
  global.dbCon = db;
  global.storage = getStorage(app);
  global.database = database;
};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
