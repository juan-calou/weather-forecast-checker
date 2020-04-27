import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from './firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faCloudSunRain, faWalking, faCompress } from '@fortawesome/free-solid-svg-icons'

import './styles/Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: ''
    }
  }

  logout = () => {
    var that = this;
    firebase.auth().signOut().then(function() {
      that.setState({
        routeName: '/login'
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const path = window.location.pathname;
    if (this.state.routeName) {
      return <Redirect to={this.state.routeName}/>
    }
    return (
      <aside className="navbar">
        <div className="menu">
          <Link className={path==='/current'?'active link':'link'} to="/current">
            <FontAwesomeIcon icon={faCloudSun} />&nbsp;Current
          </Link>
          <Link className={path==='/forecast'?'active link':'link'} to="/forecast">
            <FontAwesomeIcon icon={faCloudSunRain} />&nbsp;5-day Forecast
          </Link>
          <Link className={path==='/listpredictions'?'active link':'link'} to="/listpredictions">
            <FontAwesomeIcon icon={faWalking} />&nbsp;Predictions DB
          </Link>
          <Link className={path==='/comparepredictions'?'active link':'link'} to="/comparepredictions">
            <FontAwesomeIcon icon={faCompress} />&nbsp;Compare
          </Link>
        </div>
        <div className="menubottom">
          <button className="btn btnAlert" onClick={this.logout}>Logout</button>
        </div>
      </aside>
    );
  }
}
