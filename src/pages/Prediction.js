import React, { Component } from 'react';
import firebase from '../components/firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class Forecast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  handleViewDetail = () => {
    console.log('det');
  }

  handleDelete = () => {
    console.log('det');
  }

  componentDidMount() {
    const db = firebase.firestore();
    const newdata = [];
    var that = this;
    db.collection("predictions").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          newdata.push({
            id: doc.id,
            data: doc.data()
          });
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
                <h1>Predictions stored on the database</h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="Home__col col-12 col-md-12">
              <div className="card">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.data.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{ item.id }</td>
                          <td>{ this.formatDate(item.data.date / 1000) }</td>
                          <td>{ item.data.datenice }</td>
                          <td><button onClick={this.handleViewDetail}>View detail</button></td>
                          <td><button onClick={this.handleDelete}>Delete</button></td>
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
