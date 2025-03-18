// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeZlz85_OP6A5Bh7oia79q31Jf_wyga-c",
  authDomain: "hi-chat-1e405.firebaseapp.com",
  projectId: "hi-chat-1e405",
  storageBucket: "hi-chat-1e405.firebasestorage.app",
  messagingSenderId: "216574936409",
  appId: "1:216574936409:web:2dd506ccba22a4c0e8b848"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth referansını al
export const auth = getAuth(app);

// google sağlayıcısını kur
export const provider = new GoogleAuthProvider();

// firestore veritabanını referansını al
export const db = getFirestore(app);