// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrGgu9nmcF8TJKg5F0DicX79Box2lG4-o",
    authDomain: "assignment11-d7122.firebaseapp.com",
    projectId: "assignment11-d7122",
    storageBucket: "assignment11-d7122.firebasestorage.app",
    messagingSenderId: "515132995027",
    appId: "1:515132995027:web:4fd2117ab65ab3a2b22b26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);