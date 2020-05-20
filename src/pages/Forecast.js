import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../components/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const KEY = process.env.REACT_APP_API_KEY;

export default class Forecast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      city: process.env.REACT_APP_PERGAMINO_ID,
      data: [],
      error: []
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

  fetchCurrent = async city => {
    this.setState({loading: true});

    axios.get( 'https://api.openweathermap.org/data/2.5/forecast?id=' + city + '&appid=' + KEY)
      .then(res => {
          this.setState({
            loading: false,
            city,
            data: res.data
          });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        });
      });
  }

  handleCityChange = e => {
    this.fetchCurrent(e.target.value);
  }

  handleStoreData = () => {

    const today = new Date().getTime();
    const datenice = this.formatDate(today / 1000);
    const prediction = {
      city: this.state.city,
      date: today,
      datenice,
      forecast: this.state.data
    };

    firebase.db.collection('predictions').add(prediction);
  }

  componentDidMount() {
    this.fetchCurrent(this.state.city);
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
                <h1>5 day forecast (every 3 hours)</h1>
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
                <div className="store">
                  <button onClick={this.handleStoreData} >Store Data</button>
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
                  {
                    this.state.data.list.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{ this.formatDate(item.dt) }</td>
                          <td>{ item.weather[0].main + ' - ' + item.weather[0].description }</td>
                          <td>{ this.temperatureConverter(item.main.temp).toFixed(2) } &deg;C</td>
                          <td>{ this.temperatureConverter(item.main.feels_like).toFixed(2) } &deg;C</td>
                          <td>{ this.temperatureConverter(item.main.temp_min).toFixed(2) } &deg;C</td>
                          <td>{ this.temperatureConverter(item.main.temp_max).toFixed(2) } &deg;C</td>
                          <td>{ item.main.pressure } hPa</td>
                          <td>{ item.main.humidity }%</td>
                          <td>{ item.wind.speed } m/s</td>
                        </tr>
                      )
                    })
                  }
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
