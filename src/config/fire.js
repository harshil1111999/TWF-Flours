import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyABq7Ewkk8yGWEMpAjPXrnjOgsrKrG_Rh8",
    authDomain: "twf-flours.firebaseapp.com",
    databaseURL: "https://twf-flours.firebaseio.com",
    projectId: "twf-flours",
    storageBucket: "twf-flours.appspot.com",
    messagingSenderId: "1045477062405",
    appId: "1:1045477062405:web:1cd309843370e32e60a96c",
    measurementId: "G-986GPRY8TQ"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;