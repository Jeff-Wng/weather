import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

 const initialState = {
    results: [],
    info: [],
    city: [],
    country: [],
    keys: [],
    loading: null
}

const fetchSaves = (state, action) => {
    return updateObject(state, {
        city: action.city,
        keys: action.keys
    })
}

const setLoading = (state, action) => {
    return updateObject(state, {loading: action.loading});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SAVES: return fetchSaves(state, action);
        case actionTypes.SET_LOADING: return setLoading(state, action);
        default: return state;
    }
}

export default reducer;