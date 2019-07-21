import {SET_USER_LOCATION} from '../typeConstants'

export const setUserLocation = (lat, long) => dispatch => {
  dispatch({ type: SET_USER_LOCATION, data: { lat, long } })
}
