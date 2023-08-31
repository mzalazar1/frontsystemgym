// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvpdSbi7Vt0CJ0e392sehLvVa1g9bZTDg",
    authDomain: "systemgym-dc419.firebaseapp.com",
    projectId: "systemgym-dc419",
    storageBucket: "systemgym-dc419.appspot.com",
    messagingSenderId: "124918730096",
    appId: "1:124918730096:web:c1447e3000beb4f28a53b5"
};

// Initialize Firebase
const firebaseAapp = initializeApp(firebaseConfig);

export default firebaseAapp;