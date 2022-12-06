// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbD-aGL4ykn2mOF-948BvK1uSY7-qVMG4",
    authDomain: "secret-santa-444d9.firebaseapp.com",
    projectId: "secret-santa-444d9",
    storageBucket: "secret-santa-444d9.appspot.com",
    messagingSenderId: "250333572047",
    appId: "1:250333572047:web:0af9b7fdd53ac90dc900ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
