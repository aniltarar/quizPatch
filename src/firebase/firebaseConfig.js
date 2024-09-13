import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDbMaWM95dyZMk2Lw_22d8JmftD6KKFjbM",
  authDomain: "quizpatchproject.firebaseapp.com",
  projectId: "quizpatchproject",
  storageBucket: "quizpatchproject.appspot.com",
  messagingSenderId: "331892326197",
  appId: "1:331892326197:web:639c96cbd95b39d1ebd67c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

