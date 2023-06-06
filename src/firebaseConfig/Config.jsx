import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMOE4AE_iLySASTanqJX7lc928f44vMqg",
  authDomain: "food-app-latest-83c42.firebaseapp.com",
  projectId: "food-app-latest-83c42",
  storageBucket: "food-app-latest-83c42.appspot.com",
  messagingSenderId: "443243924293",
  appId: "1:443243924293:web:f375c08ec3170e54ff0c2c",
  measurementId: "G-E0RYH2W0FG"
};

 const  app = initializeApp(firebaseConfig);
export default app