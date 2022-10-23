import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRv99hmNJkvw8LloeNdpPB8ChSndIvuHU",
  authDomain: "netflix-clone-83810.firebaseapp.com",
  projectId: "netflix-clone-83810",
  storageBucket: "netflix-clone-83810.appspot.com",
  messagingSenderId: "548725121204",
  appId: "1:548725121204:web:dcd921ebefb98793b077e1",
  measurementId: "G-27D4LZNQWG"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);