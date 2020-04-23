import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faCloudSunRain } from '@fortawesome/free-solid-svg-icons'

import './styles/Navbar.css';

 export default class Navbar extends Component {
  render() {
    const path = window.location.pathname;
    return (
      <aside className="navbar">
        <div className="menu">
          <Link className={path==='/current'?'active link':'link'} to="/current">
            <FontAwesomeIcon icon={faCloudSun} />&nbsp;Current
          </Link>
          <Link className={path==='/forecast'?'active link':'link'} to="/forecast">
            <FontAwesomeIcon icon={faCloudSunRain} />&nbsp;5-day Forecast
          </Link>
        </div>
      </aside>
    );
  }
}
