// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
initializeApp(config);
const analytics = getAnalytics(app);