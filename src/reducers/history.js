import { GET_HISTORY_REQUEST, GET_HISTORY_SUCCESS, GET_HISTORY_ERROR, ADD_VIDEO_SUCCESS } from '../actions/actions'

const initialState = {
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
        case ADD_VIDEO_SUCCESS:
            if(state.videos) {
                state.videos.unshift(action.data);
            }
            return state;
    }
    return state;
}