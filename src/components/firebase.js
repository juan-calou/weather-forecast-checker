import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "weather-forecast-checker.firebaseapp.com",
  databaseURL: "https://weather-forecast-checker.firebaseio.com",
  projectId: "weather-forecast-checker",
  storageBucket: "weather-forecast-checker.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;
