import firebase from "firebase/app";
import "firebase/auth";

// import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyC31hZeOkfVfZTq6p-ei6BLmhAt-GvH898",
	authDomain: "completeecommerce-56ab4.firebaseapp.com",
	projectId: "completeecommerce-56ab4",
	storageBucket: "completeecommerce-56ab4.appspot.com",
	messagingSenderId: "501896493057",
	appId: "1:501896493057:web:50188b2d35f0db72cf6800",
	measurementId: "G-VWGG8TZKJM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
