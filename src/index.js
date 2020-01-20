import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebase = require("firebase");
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBEW6HI6l9YE4D-Tjo288vlXZfPKPsAVkU",
  authDomain: "evernote-clone-d52fc.firebaseapp.com",
  databaseURL: "https://evernote-clone-d52fc.firebaseio.com",
  projectId: "evernote-clone-d52fc",
  storageBucket: "evernote-clone-d52fc.appspot.com",
  messagingSenderId: "1036111230476",
  appId: "1:1036111230476:web:f9bceb5619a6a552d66029",
  measurementId: "G-5JBD8S9QCK"
});
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
