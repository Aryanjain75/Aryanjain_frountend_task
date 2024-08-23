
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3w7D5wrJWqAuNBTBnkCJjz5xjcYbkLwA",
  authDomain: "assignment1-a4c77.firebaseapp.com",
  projectId: "assignment1-a4c77",
  databaseURL:"https://assignment1-a4c77-default-rtdb.firebaseio.com/",
  storageBucket: "assignment1-a4c77.appspot.com",
  messagingSenderId: "229813461559",
  appId: "1:229813461559:web:9f096a5ed2d6789fddd5b2",
  measurementId: "G-P9TMRN7DNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database}