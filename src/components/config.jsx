import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJsKHBPRJ4jB4omNVlZL4VevnyW5q-AOY",
    authDomain: "todowithdatabase.firebaseapp.com",
    databaseURL: "https://todowithdatabase.firebaseio.com",
    projectId: "todowithdatabase",
    storageBucket: "todowithdatabase.appspot.com",
    messagingSenderId: "820756177871"
  };
  firebase.initializeApp(config);