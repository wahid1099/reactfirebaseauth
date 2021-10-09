import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebase.configuration";


 const initializeAuthentication =()=>{
     initializeApp(firebaseConfig);

 }
export  default initializeAuthentication;