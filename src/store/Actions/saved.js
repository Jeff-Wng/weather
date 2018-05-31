import * as actionTypes from '../Actions/actionTypes';
import axios from 'axios';

export const setSaves = (city, keys) => {
    return {
        type: actionTypes.FETCH_SAVES,
        city: city,
        keys: keys
    }
}

export const setLoading = (value) => {
    return {
        type: actionTypes.SET_LOADING,
        loading: value
    }
}

export const fetchSaves = () => {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        const queryParams = '?orderBy="userId"&equalTo="' + getState().auth.userId + '"';
        axios.get(''+process.env.REACT_APP_FIREBASE_URL+'/data.json' + queryParams)
            .then(response => {
                console.log(response);
                const fetchedData = [];
                const fetchedInfo = [];
                const keys = [];
                for(let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                        id: key
                    });
                }
                for(let i in fetchedData) {
                    fetchedInfo.push(fetchedData[i].city);
                    keys.push(fetchedData[i].id)
                    dispatch(setSaves(fetchedInfo, keys));
                };
            })
        dispatch(setLoading(false));
    }
}