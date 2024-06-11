// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmi3qZpKy0AmUi30vyMFbZTaQqAO_rUF0",
  authDomain: "spl-2-b6fef.firebaseapp.com",
  projectId: "spl-2-b6fef",
  storageBucket: "spl-2-b6fef.appspot.com",
  messagingSenderId: "632473210470",
  appId: "1:632473210470:web:8182b3dfa3b70c2ba527a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
