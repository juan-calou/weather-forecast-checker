import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "weather-forecast-checker.firebaseapp.com",
  databaseURL: "https://weather-forecast-checker.firebaseio.com",
  projectId: "weather-forecast-checker",
  storageBucket: "weather-forecast-checker.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}

export default new Firebase();
