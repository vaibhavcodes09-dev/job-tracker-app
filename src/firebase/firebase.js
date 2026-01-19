// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqxR1js2w8wnZ3It9KOhrxVRedXFPR0I4",
  authDomain: "job-tracker-f93a1.firebaseapp.com",
  projectId: "job-tracker-f93a1",
  storageBucket: "job-tracker-f93a1.firebasestorage.app",
  messagingSenderId: "575791628350",
  appId: "1:575791628350:web:5bbe94920e0ecca0acd16f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;