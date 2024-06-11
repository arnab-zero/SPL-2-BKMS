import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";
// import { doc, setDoc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      return { displayName, email, photoURL };
      // const userDocRef = doc(db, "users", user.uid);
      // const userDoc = await getDoc(userDocRef);

      // if (!userDoc.exists()) {
      //   await setDoc(userDocRef, {
      //     username: user.displayName || user.email.split("@")[0],
      //     rewardPoints: 0,
      //   });
      //   console.log("user data stored in firestore");
      // } else console.log("User already exists in firestore");
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
