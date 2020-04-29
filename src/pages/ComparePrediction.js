import React, { Component } from 'react';
import firebase from '../components/firebase';
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
    var time = 0;

    time = possibletime.reduce((acc, time) => {
      if(acc === 0 || time === currenttime || try_time >= time) {
        return time;
      }
      return acc;
    }, 0);

    this.state = {
      loading: true,
      data: [],
      error: [],
      city: process.env.REACT_APP_PERGAMINO_ID,
      time: time.toString(),
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
    //console.log(this.state.city, this.state.startDate, this.state.time);
    // this.state.city
    // this.state.startDate
    // this.state.time
    var time__ = this.state.time;
    var date__ = this.state.startDate;

    this.setState({loading: true});

    var newdata = [];
    var that = this;
    /// add date filter (5 days before)
    firebase.db.collection("predictions")
      .where("city", "==", this.state.city)
      .orderBy("date", "desc")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let temp = doc.data();
          console.log(temp.datenice);
          var datepred = temp.datenice;
          temp.forecast.list.reduce((acc, item) => {
            var temptime = that.formatDate(item.dt);
            var temptimesmall = temptime.slice(-2);
            console.log(time__, temptimesmall);
            if(temptimesmall === time__) {
              var tempdate = that.formatDate(item.dt).slice(0,10);
              var tempdate2 = that.formatDate(date__ / 1000).slice(0,10);
              console.log(tempdate, tempdate2);
              if(tempdate == tempdate2){
                newdata.push({datepred, item});
              }
            }
            return 0;
          }, []);
        });
        console.log(newdata);
        that.setState({
          data: newdata,
          loading: false
        });
      });

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
                    <option value=" 0">00 hs</option>
                    <option value=" 3">3 AM</option>
                    <option value=" 6">6 AM</option>
                    <option value=" 9">9 AM</option>
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

          { (this.state.data.length === 0) ?

              <div className="row">
                <div className="Home__col col-12 col-md-12">
                  <div className="card">
                    <p>No data found</p>
                  </div>
                </div>
              </div>

          :

              <div className="row">
                <div className="Home__col col-12 col-md-12">
                  <div className="card">
                  <table className="table table-bordered table-striped table-sm">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
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
                      this.state.data.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>{ item.datepred }</td>
                            <td>{ this.formatDate(item.item.dt) }</td>
                            <td>{ item.item.weather[0].main + ' - ' + item.item.weather[0].description }</td>
                            <td>{ this.temperatureConverter(item.item.main.temp).toFixed(2) } &deg;C</td>
                            <td>{ this.temperatureConverter(item.item.main.feels_like).toFixed(2) } &deg;C</td>
                            <td>{ this.temperatureConverter(item.item.main.temp_min).toFixed(2) } &deg;C</td>
                            <td>{ this.temperatureConverter(item.item.main.temp_max).toFixed(2) } &deg;C</td>
                            <td>{ item.item.main.pressure } hPa</td>
                            <td>{ item.item.main.humidity }%</td>
                            <td>{ item.item.wind.speed } m/s</td>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            }
        </div>
      </div>
    );
  }
}
