// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API,
  authDomain: import.meta.env.VITE_Auth_Domain,
  projectId: import.meta.env.VITE_ProjectId,
  storageBucket: import.meta.env.VITE_Storage_Bucket,
  messagingSenderId: import.meta.env.VITE_Message_Sender_Id,
  appId: import.meta.env.VITE_Firebase_AppId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
