import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";
import axios from "axios";

const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { displayName, email, photoURL } = user;

    const newUser = {
      displayName,
      email,
      imageLink: photoURL || "",
      rewardPoints: 0,
      workplace: "",
      location: "",
    };

    const response = await axios.post(
      "http://localhost:8080/api/users",
      newUser
    );
    console.log("User data saved successfully");
    console.log("New user: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred: ", error.message);
    return null; // Return null in case of error
  }
};

const userSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("Successfully logged out.");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export { googleSignIn, userSignOut };
