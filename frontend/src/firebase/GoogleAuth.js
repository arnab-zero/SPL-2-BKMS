import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";
import axios from "axios";

const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
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

      axios
        .post("http://localhost:8080/api/users", newUser)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error occurred: ", error);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
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
