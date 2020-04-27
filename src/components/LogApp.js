import React, { Component } from 'react';
import firebase from './firebase';

import App from './App';
import Login from '../pages/Login';

export default class LogApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    this.authlistener();
  }

  authlistener = () => {
    console.log(1);
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <>
        { this.state.user ? <App /> : <Login /> }
      </>
    )
  }
}
