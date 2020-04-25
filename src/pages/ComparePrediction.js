import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class Forecast extends Component {

  constructor(props) {
    super(props);
    const current = new Date();
    const currenttime = current.getHours();
    const possibletime = [0,3,6,9,12,15,18,21];
    const try_time = currenttime + 2;

    var time = possibletime.reduce((acc, time) => {
      if(acc === null || time === currenttime || try_time >= time) {
        return time;
      }
      return acc;
    }, null);

    this.state = {
      loading: true,
      data: [{city: 1}],
      error: [],
      city: process.env.REACT_APP_PERGAMINO_ID,
      time,
      startDate: current
    }
  }

  formatDate = d => {
    var date = new Date(d * 1000);
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    if(dd < 10) dd = '0' + dd;
    if(mm < 10) mm = '0' + mm;

    return(mm + '/' + dd + '/' + yyyy + ' - ' + hh);
  }

  temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    return (valNum - 273.15);
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleTimeChange = e => {
    this.setState({time: e.target.value});
  }

  handleCityChange = e => {
    this.setState({city: e.target.value});
  }

  handleUpdateData = () => {
    console.log('a');
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="Home">
          <div className="container">
            <div className="row">
              <div className="Home__col col-12 col-md-12">
                <div className="card">
                  <FontAwesomeIcon icon={faSpinner} className="fa fa-spin" />;
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if(this.state.data.length === 0) {
        return (
          <div className="Home">
          <div className="container">
            <div className="row">
              <div className="Home__col col-12 col-md-12">
                <div className="card">
                  <p>No data found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <h1>Compare with past predictions</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <div className="city">
                  <label htmlFor="city">City</label>
                  <select
                    name="city"
                    value={this.state.city}
                    onChange={this.handleCityChange}
                  >
                    <option value={process.env.REACT_APP_PERGAMINO_ID}>Pergamino</option>
                    <option value={process.env.REACT_APP_BUENOS_AIRES_ID} >Buenos Aires</option>
                  </select>
                </div>
                <div className="datetime">
                  <label htmlFor="datetime">Date</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                  />
                </div>
                <div className="time">
                  <label htmlFor="time">Time</label>
                  <select
                    name="time"
                    value={this.state.time}
                    onChange={this.handleTimeChange}
                  >
                    <option value="0">00 hs</option>
                    <option value="3">3 AM</option>
                    <option value="6">6 AM</option>
                    <option value="9">9 AM</option>
                    <option value="12">12 hs</option>
                    <option value="15">3 PM</option>
                    <option value="18">6 PM</option>
                    <option value="21">9 PM</option>
                  </select>
                </div>
                <div className="store">
                  <button onClick={this.handleUpdateData} >Update Chart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Description</th>
                      <th scope="col">Temperature</th>
                      <th scope="col">Feels Like</th>
                      <th scope="col">Min</th>
                      <th scope="col">Max</th>
                      <th scope="col">Pressure</th>
                      <th scope="col">Humidity</th>
                      <th scope="col">Wind Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
