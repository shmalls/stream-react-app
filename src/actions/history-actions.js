import * as services from '../requesters/services'

export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const GET_HISTORY_ERROR = 'GET_HISTORY_ERROR';
export const GET_MORE_HISTORY_REQUEST = 'GET_MORE_HISTORY_REQUEST';
export const GET_MORE_HISTORY_SUCCESS = 'GET_MORE_HISTORY_SUCCESS';
export const GET_MORE_HISTORY_ERROR = 'GET_MORE_HISTORY_ERROR';
export const ADD_VIDEO_REQUEST = 'ADD_VIDEO_REQUEST';
export const ADD_VIDEO_SUCCESS = 'ADD_VIDEO_SUCCESS';
export const ADD_VIDEO_ERROR = 'ADD_VIDEO_ERROR';
export const GOT_NEW_VIDEO = 'GOT_NEW_VIDEO';

export function addVideo(url) {
    return function (dispatch) {
        dispatch({ type: ADD_VIDEO_REQUEST });
        return services.addVideo(url).then(
            response => {
                dispatch({ type: ADD_VIDEO_SUCCESS, data: response })
            },
            err => dispatch({ type: ADD_VIDEO_ERROR, error: err })
        );
    }
}

export function getHistory() {
    return function (dispatch) {
        dispatch({ type: GET_HISTORY_REQUEST });
        return services.getHistory().then(
            response => dispatch({ type: GET_HISTORY_SUCCESS, data: response }),
            err => dispatch({ type: GET_HISTORY_ERROR, error: err })
        );
    }
}

export function getMoreHistory(id) {
    return function (dispatch) {
        dispatch({ type: GET_MORE_HISTORY_REQUEST });
        return services.getMoreHistory(id).then(
            response => dispatch({ type: GET_MORE_HISTORY_SUCCESS, data: response }),
            err => dispatch({ type: GET_MORE_HISTORY_ERROR, error: err})
        );
    }
}

export function gotNewVideo(response) {
    return function(dispatch) {
        dispatch({type: GOT_NEW_VIDEO , data: response});
    }
}