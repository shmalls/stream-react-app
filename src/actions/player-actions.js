import {
    CLIENT_GET_PLAYER,
    CLIENT_PAUSE_VIDEO,
    CLIENT_PLAY_VIDEO,
    CLIENT_ADD_VIDEO,
    CLIENT_STOP_VIDEO,
    CLIENT_SEEK_VIDEO,
    CLIENT_END_VIDEO,
    SERVER_INIT_PLAYER,
    SERVER_PAUSE_VIDEO,
    SERVER_PLAY_VIDEO,
    SERVER_ADD_VIDEO,
    SERVER_STOP_VIDEO
} from '../requesters/sockets';
import * as socket from '../requesters/sockets';
import { func } from 'prop-types';
import { Socket } from 'socket.io-client';

export const GET_PLAY_REQUEST = 'GET_PLAY_REQUEST';
export const GET_PLAY_SUCCESS = 'GET_PLAY_SUCCESS';
export const GET_PLAY_ERROR = 'GET_PLAY_ERROR';
export const GET_PLAY_REINITIALIZE = 'GET_PLAY_REINITIALIZE';
export const POST_PAUSE_REQUEST = 'POST_PAUSE_REQUEST';
export const POST_PAUSE_SUCCESS = 'POST_PAUSE_SUCCESS';
export const POST_PAUSE_ERROR = 'POST_PAUSE_ERROR';
export const GET_PAUSE_REQUEST = 'POST_PAUSE_REQUEST';
export const GET_PAUSE_SUCCESS = 'POST_PAUSE_SUCCESS';
export const GET_PAUSE_ERROR = 'POST_PAUSE_ERROR';
export const POST_SEEK_REQUEST = 'POST_SEEK_REQUEST';
export const POST_SEEK_SUCCESS = 'POST_SEEK_SUCCESS';
export const POST_SEEK_ERROR = 'POST_SEEK_ERROR';
export const GET_PLAYER_STATE = 'GET_PLAYER_STATE';
export const GET_PLAYER_REQUEST = 'GET_PLAYER_REQUEST';
export const GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS';
export const GET_PLAYER_ERROR = 'GET_PLAYER_ERROR';
export const GOT_PLAY_EVENT = 'GOT_PLAY_EVENT';
export const GOT_PAUSE_EVENT = 'GOT_PAUSE_EVENT';
export const EVENT_FROM_SERVER_REINIT = 'EVENT_FROM_SERVER_REINIT';
export const EXECUTE_EVENT = 'EXECUTE_EVENT';


// PLAY is POST but server does not use object
// object sent for server logging
export function playVideo(player) {
    return function (dispatch) {
        dispatch({ type: GET_PLAY_REQUEST });
        return socket.newEmit(CLIENT_PLAY_VIDEO, player).then(
            response => dispatch({ type: GET_PLAY_SUCCESS, data: response }),
            err => dispatch({ type: GET_PLAY_ERROR, error: err })
        );
    }
}

// PAUSE is POST server updates time based on client time sent
export function pauseVideo(player) {
    return function (dispatch) {
        dispatch({ type: POST_PAUSE_REQUEST });
        return socket.newEmit(CLIENT_PAUSE_VIDEO, player).then(
            response => dispatch({ type: POST_PAUSE_SUCCESS, data: response }),
            err => dispatch({type: POST_PAUSE_ERROR, error: err })
        )
    }
}

export function getPauseVideo() {
    return function (dispatch) {
        dispatch({ type: GET_PAUSE_REQUEST });
        return socket.listenPause((data) => {
            return dispatch({type: GET_PAUSE_SUCCESS, data: data});
        })
    }
}

export function seekVideo(player) {
    return function (dispatch) {
        dispatch({ type: POST_SEEK_REQUEST });
        return socket.newEmit(CLIENT_SEEK_VIDEO, player).then(
            response => dispatch({ type: POST_SEEK_SUCCESS, data: response }),
            err => dispatch({type: POST_SEEK_ERROR, error: err })
        )
    }
}

export function getPlayerState(player) {
    return function(dispatch) {
        dispatch({ type: GET_PLAYER_STATE, data: player });
    }
}

export function getPlayer() {
    return function(dispatch) {
        dispatch({ type: GET_PLAYER_REQUEST });
        return socket.newEmit(CLIENT_GET_PLAYER).then(
            response => dispatch({ type: GET_PLAYER_SUCCESS, data: response }),
            err => dispatch({ type: GET_PLAYER_ERROR, error: err })
        )
    }
}

export function gotPlayEvent(response) {
    return function(dispatch) {
        dispatch({ type: GOT_PLAY_EVENT, data: response.eventFromServer.player, event:response.eventFromServer})
    }
}

export function gotPauseEvent(response) {
    console.log('in got pause event',response);
    return function(dispatch) {
        dispatch({ type: GOT_PAUSE_EVENT, data: response.eventFromServer.player, event:response.eventFromServer})
    }
}

export function executeEvent(index) {
    return function (dispatch) {
        dispatch({ type: EXECUTE_EVENT, data: index });
    }
}