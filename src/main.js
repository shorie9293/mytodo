import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/sass/style.scss';
import { FontAwesomeIcon } from "@/plugins/font-awesome";
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAUx6jXnnWzafhnUrzkDcczg2pC4WKbVA8",
  authDomain: "maguroquest.firebaseapp.com",
  projectId: "maguroquest",
  storageBucket: "maguroquest.appspot.com",
  messagingSenderId: "128972192686",
  appId: "1:128972192686:web:6138937c378f1e0e13e63f",
  measurementId: "G-EWEFC6SRDS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


createApp(App)
  .component("fa", FontAwesomeIcon)
  .mount("#app");

