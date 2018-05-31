import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    input: null,
    results: [],
    city: [],
    country: [],
    loading: null,
    showWeather: false,
    savedWeather: false,
    showNotification: null,
    error: null,
    hasError: false
}

const getInput = (state, action) => {
    return updateObject(state, {input: action.event});
}

const setCity = (state, action) => {
    return updateObject(state, {
        results: action.results,
        city: action.city,
        country: action.country,
        loading: action.loading,
        showWeather: action.showWeather,
        savedWeather: action.savedWeather,
        error: null,
        hasError: false
    })
}

const resetState = (state, action) => {
    return updateObject(state, {
        input: null,
        results: [],
        city: [],
        country: [],
        loading: null,
        showWeather: false,
        savedWeather: false,
        showNotification: null
    })
}

const showNotification = (state, action) => {
    return updateObject(state, {showNotification: action.showNotification});
}

const getError = (state, action) => {
    return updateObject(state, {
        error: action.err,
        hasError: true,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_INPUT: return getInput(state, action);
        case actionTypes.SET_CITY: return setCity(state, action);
        case actionTypes.RESET_STATE: return resetState(state, action);
        case actionTypes.SHOW_NOTIFICATION: return showNotification(state, action);
        case actionTypes.GET_ERROR: return getError(state, action);
        default: return state;
    }
}

export default reducer;