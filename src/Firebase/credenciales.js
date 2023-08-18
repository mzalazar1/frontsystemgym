import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC33k6gmHzDWiK_6IAnB7ASWXVXn3Xj4SM",
    authDomain: "final-mcga-4a331.firebaseapp.com",
    projectId: "final-mcga-4a331",
    storageBucket: "final-mcga-4a331.appspot.com",
    messagingSenderId: "110159452249",
    appId: "1:110159452249:web:c9551e81c2529001293948",
    measurementId: "G-E8JVKHV7WZ"
};
const firebaseAapp = initializeApp(firebaseConfig);

export default firebaseAapp