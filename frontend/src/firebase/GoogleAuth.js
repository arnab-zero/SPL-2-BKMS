import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase.config";


const provider = new GoogleAuthProvider();

const googleSignIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(credential, user);
        }).catch((error) => {
            console.log(error.message);
        });
}

const userSignOut = () => {
    signOut(auth).then(() => {
        console.log("Successfully logged out.")
    }).catch((error) => {
        console.log(error.message)
    });
}

export { googleSignIn, userSignOut };

