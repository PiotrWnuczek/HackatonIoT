import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyDd2MO7WDRo8dB8VVDr3HVKfLlPkgapxSI',
  authDomain: 'smartdevice-db.firebaseapp.com',
  projectId: 'smartdevice-db',
  storageBucket: 'smartdevice-db.appspot.com',
  messagingSenderId: '734496805944',
  appId: '1:734496805944:web:7d6a3570409447fe9342cd',
  measurementId: 'G-QFE7CL0FKQ',
  databaseURL: 'https://smartdevice-db-default-rtdb.europe-west1.firebasedatabase.app/',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
