import {
    GET_BATTERY_LEVEL,
    GET_ROBOT_CONNECTION,
    GET_SPEED,
    GET_TEMP,
    SET_SPEED,
    SET_TEMP,
    SET_BATTERY
} from '../types'

export default (state, action) => {
    switch (action.type) {

        case GET_ROBOT_CONNECTION:
            return {
                ...state,
                connection: action.payload,
                loading: false
            }
        case GET_BATTERY_LEVEL:
            return{
                ...state,
                batteryLevel: action.payload,
                loading: false
            }
        case GET_TEMP:
            return{
                ...state,
                temperature: action.payload,
                loading:false
            }
        case GET_SPEED:
            return{
                ...state,
                speed: action.payload,
                loading:false
            }
        case SET_SPEED:
            return{
                ...state,
                speed: action.payload,
                connection:true,
                loading: false
            }
        case SET_TEMP:
            return{
                ...state,
                temperature: action.payload,
                connection:true,
                loading: false
            }
        case SET_BATTERY:
            return{
                ...state,
                batteryLevel: action.payload,
                connection:true,
                loading: false
            }
        default:
            return state;

    }
}