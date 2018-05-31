import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    displayName: null,
    token: null,
    userId: null,
    error: null,
    loading: false,
    loggedIn: false
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        displayName: action.displayName,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        loggedIn: true
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const logOut = (state, action) => {
    return updateObject(state, {
        displayName: null,
        token: null,
        userId: null,
        loggedIn: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.LOG_OUT: return logOut(state, action);
        default: return state;
    }
}

export default reducer;