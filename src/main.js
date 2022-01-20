import App from "./App.svelte";

// Setup Service worker/PWA
window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator && true) {
    navigator.serviceWorker.register("./sw.js");
  }
};

//Setup firebase store with offline support
import { initializeApp } from "firebase/app";
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "@firebase/firestore";

/* eslint-disable no-undef */
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
};
const firebase = initializeApp(firebaseConfig);
const db = initializeFirestore(firebase, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
/* eslint-enable no-undef*/

enableIndexedDbPersistence(db);

// Setup Front End
const app = new App({
  target: document.body,
});

export default app;
