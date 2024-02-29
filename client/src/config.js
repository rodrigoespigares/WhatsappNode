// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAW6uezaGstSNL-q22838I1KjqMHwywezY",
  authDomain: "whatsappnode.firebaseapp.com",
  projectId: "whatsappnode",
  storageBucket: "whatsappnode.appspot.com",
  messagingSenderId: "747792821721",
  appId: "1:747792821721:web:8ddbe8db6a9d342144fdc8"

};
  
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
export const BASE_URL = "http://localhost:3000"+"/";
export const BASE_URL_2000 = "http://localhost:3000"+"/";