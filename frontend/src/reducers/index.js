
import {SET_USER_LOCATION} from '../typeConstants'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_LOCATION:
           
            return {...state, lat:  action.data.lat, long: action.data.long }
    }
}

export default reducer;