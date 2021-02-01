import {
    GET_PLAY_REQUEST, 
    GET_PLAY_SUCCESS, 
    GET_PLAY_ERROR,
    GET_PLAY_REINITIALIZE,
    POST_PAUSE_REQUEST,
    POST_PAUSE_SUCCESS,
    POST_PAUSE_ERROR,
    GET_PAUSE_REQUEST,
    GET_PAUSE_SUCCESS,
    POST_SEEK_REQUEST,
    POST_SEEK_SUCCESS,
    POST_SEEK_ERROR,
    GET_PLAYER_STATE,
    GET_PLAYER_REQUEST,
    GET_PLAYER_SUCCESS,
    GET_PLAYER_ERROR,
    GOT_PLAY_EVENT,
    GOT_PAUSE_EVENT,
    EVENT_FROM_SERVER_REINIT,
    EXECUTE_EVENT
} from '../actions/player-actions';

const initialState = {
    playing: false,
    time: 0,
    started: false,
    loading: false,
    postingPause: false,
    postedPause: false,
    gettingPause:false,
    gotPause: false,
    gotPlay: false,
    postingSeek: false,
    postedSeek: false,
    eventFromServer: false,
    loaded: false,
    error: false,
    errorMsg: undefined,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PLAY_REQUEST:
            return { ...state, loading: true };
        case GET_PLAY_SUCCESS:
            return { ...state, ...action.data , loading: false, loaded: true };
        case GET_PLAY_ERROR:
            //console.log("REDUCER:GET_PLAY_ERROR: error",action.err);
            return { ...state, error: true, errorMsg: action.err }
        case GET_PLAY_REINITIALIZE:
            return { ...state, loaded: false, loading: false}
        case POST_PAUSE_REQUEST:
            return { ...state, postingPause: true }
        case POST_PAUSE_SUCCESS:
            return { ...state, ...action.data, postingPause: false, postedPause: true }
        case POST_PAUSE_ERROR:
            return { ...state, postingPause: false, error: true, errorMsg: action.error }
        case GET_PAUSE_REQUEST:
            return { ...state, gettingPause: true }
        case GET_PAUSE_SUCCESS:
            return { ...state, ...action.data, gettingPause: false, gotPause: true }
        case POST_SEEK_REQUEST:
            return { ...state, postingSeek: true }
        case POST_SEEK_SUCCESS:
            return { ...state, ...action.data, postingSeek: false, postedSeek: true }
        case POST_SEEK_ERROR:
            return { ...state, postingSeek: false, error: true, errorMsg: action.error }
        case GET_PLAYER_STATE:
            return { ...state, ...action.data};
        case GOT_PLAY_EVENT:
            return { ...state, ...action.data, gotPlay: true};
        case GOT_PAUSE_EVENT:
            return { ...state, ...action.data, gotPause: true};
        case EVENT_FROM_SERVER_REINIT:
            return { ...state, eventFromServer: false}
        case GET_PLAYER_REQUEST: 
            return { ...state, loading: true };
        // case EXECUTE_EVENT: 
        //     state.events[action.data].executed = true;
        //     return {...state};
        case GET_PLAYER_SUCCESS: 
            return { ...state, ...action.data, loading: false, loaded: true };
        case GET_PLAYER_ERROR: 
            return { ...state, loading: false, loaded: false, error: true, errorMsg: action.error };
    }
    return state;
}