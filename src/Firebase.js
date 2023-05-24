import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC0m51C7V3JXcgAqdOPxZCTZXotEtFtitI",
  authDomain: "blog-a850c.firebaseapp.com",
  projectId: "blog-a850c",
  storageBucket: "blog-a850c.appspot.com",
  messagingSenderId: "826054571995",
  appId: "1:826054571995:web:75fe3867cb85fd61a3d9fe",
  measurementId: "G-1TKB97TLM8"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// firebase.initializeApp({
  
// });

// const fb = firebase;

// export default fb;