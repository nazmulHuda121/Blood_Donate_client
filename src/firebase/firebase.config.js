// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQ6BfKtf52T6QOM7VRT9ND7uEE8VpA1KU',
  authDomain: 'blood-donate-6510d.firebaseapp.com',
  projectId: 'blood-donate-6510d',
  storageBucket: 'blood-donate-6510d.firebasestorage.app',
  messagingSenderId: '1026465923564',
  appId: '1:1026465923564:web:52f8e4d8746059d56580c9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
