import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyCIlGKfk_SB9vwuRIBpEfyPB5Q7TkCFoVM",
  authDomain: "hackatoniot-dev.firebaseapp.com",
  projectId: "hackatoniot-dev",
  storageBucket: "hackatoniot-dev.appspot.com",
  messagingSenderId: "199457656087",
  appId: "1:199457656087:web:2b8b907342596a4bf77b52",
  measurementId: "G-SCQNSF3G33",
  databaseURL:
    "https://hackatoniot-dev-default-rtdb.europe-west1.firebasedatabase.app/",
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
