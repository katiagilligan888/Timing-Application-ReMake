import {SET_USER_LOCATION, SET_FORMATTED_DATE_TODAY, SET_SUNRISE_TODAY } from '../typeConstants'

export const setUserLocation = (lat, long) => dispatch => {
  dispatch({ type: SET_USER_LOCATION, data: { lat, long } })
}

export const setFormattedDateToday = (formattedDate) => dispatch => {
  dispatch({ type: SET_FORMATTED_DATE_TODAY, data: formattedDate})
}

export const setSunriseToday = (sunrise) => dispatch => {
  dispatch({ type: SET_SUNRISE_TODAY, data: sunrise})
}
