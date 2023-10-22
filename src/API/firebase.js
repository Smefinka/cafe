import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMRpJrbid8M--id7Lw2f1MrlhC_ez07ug",
  authDomain: "fast-food-restaurant-3a068.firebaseapp.com",
  projectId: "fast-food-restaurant-3a068",
  storageBucket: "fast-food-restaurant-3a068.appspot.com",
  messagingSenderId: "518725047178",
  appId: "1:518725047178:web:4a27846b2159110f606e73",
  measurementId: "G-W8TEZXJ25K",
  // databaseURL: 'https://console.firebase.google.com',
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const DB_URL = "https://console.firebase.google.com";
export const auth = getAuth(app);
