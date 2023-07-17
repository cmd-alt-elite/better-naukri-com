// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore/lite'; 

const firebaseConfig = {
  apiKey: "AIzaSyCXEiIy19IX51SbD_oQSwP0mNFWniUM_44",
  authDomain: "better-naukri-com.firebaseapp.com",
  projectId: "better-naukri-com",
  storageBucket: "better-naukri-com.appspot.com",
  messagingSenderId: "174061146312",
  appId: "1:174061146312:web:23d3d958bffbe74bbc55fd",
  measurementId: "G-Q9TXG5HC5V"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const applicantCollection = collection(database, "Applicants");
export const jobsCollection = collection(database, "Jobs");
export const recruiterCollection = collection(database, "Recruiters");