import { GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_ERROR, ADD_VIDEO_REQUEST, ADD_VIDEO_SUCCESS, ADD_VIDEO_ERROR } from '../actions/actions'
import * as socket from '../actions/socket-actions';

const initialState = {
    added: false,
    adding: false,
    loaded: false,
    loading: false,
    error: false,
    errorMsg: undefined,
    videos: undefined
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORY_REQUEST:
            return { ...state, loading: true };
        case GET_HISTORY_SUCCESS:
            return { ...state, loading: false, loaded: true, videos: action.data }
        case GET_HISTORY_ERROR: 
            return { ...state, loading: false, loaded: false, error: true, errorMsg: action.err }
        case ADD_VIDEO_REQUEST:
            return { ...state, adding: true };
        case ADD_VIDEO_SUCCESS:
            if(state.videos) {
                socket.emitAdd(action.data);
                state.videos.unshift(action.data);
            }
            return {...state, adding: false, added: true};
        case ADD_VIDEO_ERROR: 
            return { ...state, adding: false, added: false, error: true, errorMsg: action.err }
    }
    return state;
}