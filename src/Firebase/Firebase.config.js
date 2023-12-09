// Install firebase: npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRv8yAou-v_Sy8lZmK69WmnsfBphrmLQI",
  authDomain: "tblog-f4ddd.firebaseapp.com",
  projectId: "tblog-f4ddd",
  storageBucket: "tblog-f4ddd.appspot.com",
  messagingSenderId: "210179454792",
  appId: "1:210179454792:web:5b7822e18c0f7f6d76657d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;