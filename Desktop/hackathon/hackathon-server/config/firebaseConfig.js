const { initializeApp, getApps } = require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyBLSwbgTb4H10b2QvEiY-z_MIWpnOlfOF8",
  authDomain: "react-firebase-26ee3.firebaseapp.com",
  projectId: "react-firebase-26ee3",
  storageBucket: "react-firebase-26ee3.appspot.com",
  messagingSenderId: "153661998423",
  appId: "1:153661998423:web:0d2cf17f5ffd440c0baa12",
  measurementId: "G-4B4M6787C6",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
module.exports = app;
