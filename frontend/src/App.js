import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setUserLocation,
  setFormattedDateToday,
  setSunriseToday
} from "./actions";
import axios from "axios";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.onAppStart();
  };

  async onAppStart() {
    await this.getCurrentLocationOfUser();
    await this.getCurrentTimeAndDate();
  }

  getCurrentTimeAndDate() {
    let time = new Date();
    let formattedDate = this.getFormattedDate(time);
    this.props.setFormattedDateToday(formattedDate);
    const options = {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
      month: "long",
      day: "numeric"
    };
    let newTime = time.toLocaleString("en-US", options);
    this.setState({ displayTime: newTime });
    // update time every 15 seconds
    setInterval(() => {
      time = new Date();
      newTime = time.toLocaleString("en-US", options);
      this.setState({ displayTime: newTime });
    }, 15000);
  }

  getFormattedDate = date => {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };

  getSunrise = () => {
    if (
      this.props.latitude &&
      this.props.longitude &&
      this.props.formattedDateToday
    ) {
      axios
        .get(
          `https://api.sunrise-sunset.org/json?lat=${this.props.latitude}&lng=${
            this.props.longitude
          }&date=today`
        )
        .then(res => {
          let sunrise = moment(
            new Date(
              `${this.props.formattedDateToday} ${res.data.results.sunrise} UTC`
            )
          ).format("hh:mm a");
          this.props.setSunriseToday(sunrise);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  // access window's location object to ask user to grant permission
  getCurrentLocationOfUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      // TODO: If the user does not allow their location to be accessed, display message that requires them to enable in order to use the application
    }
  };

  showPosition = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    // set longitude and latitude to the redux store
    this.props.setUserLocation(lat, long);
  };

  render() {
    if (!this.props.sunriseToday) {
      this.getSunrise();
    }
    return (
      <div>
        <p>{this.state.displayTime} </p>
        <p>Today</p>
        <p>Sunrise: {this.props.sunriseToday}</p>
      </div>
    );
  }
}

const bindActions = dispatch => ({
  setUserLocation: (lat, long) => dispatch(setUserLocation(lat, long)),
  setFormattedDateToday: formattedDate =>
    dispatch(setFormattedDateToday(formattedDate)),
  setSunriseToday: sunrise => dispatch(setSunriseToday(sunrise))
});

const mapStateToProps = state => {
  return {
    latitude: state.lat,
    longitude: state.long,
    formattedDateToday: state.formattedDateToday,
    sunriseToday: state.sunriseToday
  };
};

export default connect(
  mapStateToProps,
  bindActions
)(App);
