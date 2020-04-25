import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class Current extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      city: process.env.REACT_APP_PERGAMINO_ID,
      data: []
    }
  }

  temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    return (valNum - 273.15);
  }

  fetchCurrent = async city => {
    this.setState({loading: true});
    const KEY = process.env.REACT_APP_API_KEY;

    const res = await axios.get( 'http://api.openweathermap.org/data/2.5/weather?id=' + city + '&appid=' + KEY)
      .then(res => {
          var data = res.data;
          console.log(data);
          this.setState({
            loading: false,
            city,
            data
          });
      })
      .catch(err => console.log(err));
      return res;
  }

  handleCityChange = e => {
    console.log(e.target.value);
    this.fetchCurrent(e.target.value);
  }

  componentDidMount() {
    this.fetchCurrent(this.state.city);
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <h1>Current Weather</h1>
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
              </div>
            </div>
          </div>
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                {
                  this.state.loading
                  ?
                  <FontAwesomeIcon icon={faSpinner} className="fa fa-spin" />
                  :
                  <>
                    <table className="table table-bordered table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Description:</th>
                          <td>{ this.state.data.weather[0].main + ' - ' + this.state.data.weather[0].description }</td>
                        </tr>
                        <tr>
                          <th scope="row">Temperature:</th>
                          <td>{ this.temperatureConverter(this.state.data.main.temp).toFixed(2) } &deg;C</td>
                        </tr>
                        <tr>
                          <th scope="row">Feels Like:</th>
                          <td>{ this.temperatureConverter(this.state.data.main.feels_like).toFixed(2) } &deg;C</td>
                        </tr>
                        <tr>
                          <th scope="row">Min:</th>
                          <td>{ this.temperatureConverter(this.state.data.main.temp_min).toFixed(2) } &deg;C</td>
                        </tr>
                        <tr>
                          <th scope="row">Max:</th>
                          <td>{ this.temperatureConverter(this.state.data.main.temp_max).toFixed(2) } &deg;C</td>
                        </tr>
                        <tr>
                          <th scope="row">Pressure:</th>
                          <td>{ this.state.data.main.pressure } hPa</td>
                        </tr>
                        <tr>
                          <th scope="row">Humidity:</th>
                          <td>{ this.state.data.main.humidity }%</td>
                        </tr>
                        <tr>
                          <th scope="row">Wind Speed:</th>
                          <td>{ this.state.data.wind.speed } m/s</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
