import * as actionTypes from './actionTypes';
import axios from 'axios';

const REACT_API_KEY = process.env.REACT_APP_API_KEY;

export const getInput = (e) => {
    return {
        type: actionTypes.GET_INPUT,
        event: e
    }
}

export const setCity = (results, city, country, loading, showWeather, savedWeather) => {
    return {
        type: actionTypes.SET_CITY,
        results: results,
        city: city,
        country: country,
        loading: loading,
        showWeather: showWeather,
        savedWeather: savedWeather
    }
}

export const resetState = () => {
    return {
        type: actionTypes.RESET_STATE
    }
}

export const showNotification = (value) => {
    return {
        type: actionTypes.SHOW_NOTIFICATION,
        showNotification: value
    }
}

export const getError = (err) => {
    return {
        type: actionTypes.GET_ERROR,
        err: err.response.data.message
    }
}

export const search = () => {
    return (dispatch, getState) => {
        const cityUrl =  'https://api.openweathermap.org/data/2.5/forecast?q=';
        const zipUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
        const apiKey = '&mode=json&cnt=5&units=imperial&APPID='+REACT_API_KEY;
        dispatch(setCity([], [], [], true, false, false));
        let fullUrl = null;
        if(isNaN(getState().weather.input)) {
            fullUrl = cityUrl + getState().weather.input + apiKey;
        } else if (!isNaN(getState().weather.input)) {
            fullUrl = zipUrl + getState().weather.input + apiKey;
        }
        axios.get(fullUrl)
            .then(response => {
                dispatch(setCity(response.data.list, response.data.city.name, response.data.city.country, false, true, false));
            })
            .catch(err => {
                dispatch(getError(err));
            })
     }
}

export const save = () => {
    return (dispatch, getState) => {
        if(getState().auth.loggedIn) {
            const data = {
                input: getState().weather.input,
                city: getState().weather.city,
                userId: getState().auth.userId,

            };
            axios.post('https://weather-app-10878.firebaseio.com/data.json', data)
                .then(response => {
                    dispatch(setCity(getState().weather.results, getState().weather.city, getState().weather.country, false, true, true));
                })
        } else if (!getState().auth.loggedIn) {
            dispatch(showNotification(true));
        }
    } 
}