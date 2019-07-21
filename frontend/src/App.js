import  React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUserLocation} from './actions';

class App extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
   this.onAppStart()
  }

  async onAppStart(){
    await this.getCurrentLocationOfUser()
  }

  getCurrentLocationOfUser = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition)
    }
  }

  showPosition = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude; 
    this.props.setUserLocation(lat, long);
  }



  render(){
  
    return(
      <div>
        <p> </p>
        </div>
    )
  }
}

const bindActions = dispatch => ({
  setUserLocation: (lat, long) => dispatch(setUserLocation(lat,long))
})

const mapStateToProps = state => ({
  longitude: state
  // latitude: state.lat, 
  // longitude: state.long
}, () => console.log(state))

export default connect(
  mapStateToProps,
  bindActions
)(App)