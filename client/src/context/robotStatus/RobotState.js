import React, { useContext, useEffect, Fragment, useReducer } from 'react'
import axios from 'axios';
import RobotContext from './robotContext';
import RobotReducer from './robotReducer';
import {
  GET_ROBOT_CONNECTION,
  GET_BATTERY_LEVEL,
  GET_TEMP,
  GET_SPEED,
  SET_SPEED,
  SET_TEMP,
  SET_BATTERY
} from '../types'

import { API_ROBOT } from '../../util/devConst';

const RobotState = props => {
    const initialState = {
        connection : false,
        batteryLevel: 0,
        temperature: 0,
        speed: 0,
        loading: true
    }
    const [state, dispatch] = useReducer(RobotReducer, initialState);

    const getConnectionStatus = async () => {
        try{
            const res = await axios.get(API_ROBOT+"/status");
            dispatch({
                type: GET_ROBOT_CONNECTION,
                payload: res.data
            });
        }catch (err){
            dispatch({
                type: GET_ROBOT_CONNECTION,
                payload: false
            });
           
        }
    }

    const getBatteryLevel = async () =>{
        try{
            const res = await axios.get(API_ROBOT+"/bat")
            dispatch({
                type: GET_BATTERY_LEVEL,
                payload: res.data.Battery
            })
        }
        catch(err){
            console.error(err.message)
        }
    }

    const getTemp = async()=>{
        try{
            const res = await axios.get(API_ROBOT+"/temp")
         
            dispatch({
                type: GET_TEMP,
                payload: res.data.Temp
            })
        }catch(err){
            console.error(err.message);
        }
    }

    const getSpeed = async() =>{
        try{
            const res = await axios.get(API_ROBOT+"/speed")

            dispatch({
                type: GET_SPEED,
                payload: res.data.Speed
            })

        }catch(err){
            console.error(err.message);
        }
    }

    const setSpeed = (val) =>{
        dispatch({
            type: SET_SPEED,
            payload: val
        });
    }
    const setTemp = (val) =>{
        dispatch({
            type: SET_TEMP,
            payload: val
        });
    }

    const setBattery = (val) =>{
        dispatch({
            type: SET_BATTERY,
            payload: val
        });
    }
 
    return(
        <RobotContext.Provider value={{
            connection: state.connection,
            batteryLevel: state.batteryLevel,
            temperature: state.temperature,
            speed: state.speed,
            loading: state.loading,
            getConnectionStatus,
            getBatteryLevel,
            getTemp,
            getSpeed,
            setSpeed,
            setBattery,
            setTemp
        }}>
             {props.children}
        </RobotContext.Provider>
    )
}

export default RobotState;