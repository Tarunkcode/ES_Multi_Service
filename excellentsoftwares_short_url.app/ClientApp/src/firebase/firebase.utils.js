import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from "firebase/auth";
import { collection } from "firebase/firestore";
import { getFirestore, getDoc,getDocs, doc, setDoc } from "firebase/firestore";
import { SaveNewUserDetailstoDb, UserExistAlreadyOrNot } from "../components/Validations/SignUp/signup.component";

export { onAuthStateChanged };
export { createUserWithEmailAndPassword };

const config = {
    apiKey: "AIzaSyDxrT2y_h3j4vH97aTwOPtvYF0Y-6jN_cA",
    authDomain: "esurlshortner.firebaseapp.com",
    projectId: "esurlshortner",
    storageBucket: "esurlshortner.appspot.com",
    messagingSenderId: "446783452978",
    appId: "1:446783452978:web:40450f7f4f850a2253892b",
    measurementId: "G-01LF0RC2WF"
};
// Initialize Firebase
const app = initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });




// Always wrap signInWithPopup inside a function in order for there working
export const signInWithGoogle = (domain) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            let user = UserExistAlreadyOrNot(domain, result.user.uid);

            let body = {
                userId: result.user.uid,
                uName: result.user.displayName,
                password: null,
                email: result.user.email,
                phoneNo: result.user.phoneNumber,
                isCaptchaEnable :false
            }
            if (user) {


            } else {
                SaveNewUserDetailstoDb(domain, body)
            }
        })
        .catch((error) => {
            console.log(error);
    });

}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = doc(firestore, `users/${userAuth.uid}`);

    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) {
        const { displayName, email } = userAuth;    
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                createdAt,
                email,
                ...additionalData
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
};

export async function listAllUsers() {
    const usersCollectionRef = collection(firestore, 'users');
  
    const userShot = await getDocs(usersCollectionRef);
    const userList = userShot.docs.map(doc => doc.data());
    userShot.docs.map((item, index) => {
        userList[index].uid = item.id;
    });
    console.log(userList)
    return userList;
}
export default firebase;