import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBr_eqEJhS1te69KakL2Nc83cJamBRpUps",
  authDomain: "mtscompany-4ee95.firebaseapp.com",
  projectId: "mtscompany-4ee95",
  storageBucket: "mtscompany-4ee95.firebasestorage.app",
  messagingSenderId: "825261344431",
  appId: "1:825261344431:web:4110f5a523adf42630765a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
