import * as socket from '../actions/socket-actions';
import { ADD_VIDEO_REQUEST, ADD_VIDEO_SUCCESS, ADD_VIDEO_ERROR } from '../actions/actions'

const initialState = {
    added: false,
    adding: false,
    error: false,
    errorMsg: undefined,
    videos: undefined
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_VIDEO_REQUEST:
            return { ...state, adding: true };
        case ADD_VIDEO_SUCCESS:
            socket.emitAdd(action.data);
            return { ...state, adding: false, added: true }
        case ADD_VIDEO_ERROR: 
            return { ...state, adding: false, added: false, error: true, errorMsg: action.err }
    }
    return state;
}