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
    EXECUTE_EVENT
} from '../actions/player-actions';

const initialState = {
    events: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GOT_PLAY_EVENT:
            state.events.unshift({...action.event});
            return { ...state };
        case GOT_PAUSE_EVENT:
            state.events.unshift({...action.event});
            return { ...state };
    }
    return state;
} 