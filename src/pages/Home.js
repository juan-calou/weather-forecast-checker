import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faBuilding, faChartBar } from '@fortawesome/free-solid-svg-icons'

import './styles/Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="container-fluid">
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <h1>Weather forecast checker</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="Home__col col-4 col-md-4">
              <Link className='homelink' to="/current">
                <div className="card user">
                  <FontAwesomeIcon icon={faCloudSun}  className="fa" />
                </div>
              </Link>
            </div>
            <div className="Home__col col-4 col-md-4">
              <div className="card company">
                <FontAwesomeIcon icon={faBuilding}  className="fa" />
              </div>
            </div>
            <div className="Home__col col-4 col-md-4">
              <div className="card graph">
                <FontAwesomeIcon icon={faChartBar}  className="fa" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
