import * as actionTypes from './actionTypes';
import axios from 'axios';

let GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (displayName, idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        displayName: displayName,
        idToken: idToken,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('displayName');
    return {
        type: actionTypes.LOG_OUT
    }
}

export const auth = (displayName, email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            displayName: displayName,
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+GOOGLE_KEY;
        if(!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+GOOGLE_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('displayName', response.data.displayName);
                dispatch(authSuccess(response.data.displayName, response.data.idToken, response.data.localId));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error.response.data.error));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                const userId = localStorage.getItem('userId');
                const displayName = localStorage.getItem('displayName');
                dispatch(authSuccess(displayName, token, userId));
            }
        }
    }
}