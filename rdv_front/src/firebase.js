import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMjJ2dBPDWAx0sQAux0-KS0Fx4dpRmsLU",
    authDomain: "rdvs-28a74.firebaseapp.com",
    projectId: "rdvs-28a74",
    storageBucket: "rdvs-28a74.appspot.com",
    messagingSenderId: "728072010618",
    appId: "1:728072010618:web:262f1618ee89eadb1134c3",
    measurementId: "G-WZ9T1LT5KE"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export { db };