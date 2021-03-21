import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBiy8rSQTupbzICnNZ6UCJruCijP2mFbxQ",
    authDomain: "crud-16806.firebaseapp.com",
    projectId: "crud-16806",
    storageBucket: "crud-16806.appspot.com",
    messagingSenderId: "708742792651",
    appId: "1:708742792651:web:6bf9cd0a9038592967a24e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);