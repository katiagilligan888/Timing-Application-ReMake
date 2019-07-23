
import {SET_USER_LOCATION, SET_FORMATTED_DATE_TODAY, SET_SUNRISE_TODAY} from '../typeConstants'

const initialState = {
}

export const reducerss = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_LOCATION:
            return { ...state, lat:  action.data.lat, long: action.data.long }
        case SET_FORMATTED_DATE_TODAY: 
            return { ...state, formattedDateToday: action.data}
        case SET_SUNRISE_TODAY:
            return {...state, sunriseToday: action.data}
        default: 
        return state; 
    }
}

