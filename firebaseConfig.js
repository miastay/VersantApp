import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'versant-c09bc.firebaseapp.com',
  databaseURL: 'https://versant-c09bc.firebaseio.com',
  projectId: 'versant-c09bc',
  storageBucket: 'versant-c09bc.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-1-886853321349-ios-7ebbcb5ab3a3ad11699fec',
  measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
