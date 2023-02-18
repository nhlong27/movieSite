// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'moviesite-1f49d.firebaseapp.com',
  projectId: 'moviesite-1f49d',
  storageBucket: 'moviesite-1f49d.appspot.com',
  messagingSenderId: '806957386942',
  appId: '1:806957386942:web:e3e8a3cec0e85cb3c222ef',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
