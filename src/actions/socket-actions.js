import io from "socket.io-client";

const ENDPOINT = "http://69.154.54.105:4001";
const config = {
    withCredentials: true,
    extraHeaders: { "custom-headers": "test" }
};
const socket = io(ENDPOINT, config);

const PLAYER_STATE = 'PLAYER_STATE';
const PAUSE_VIDEO = 'PAUSE_VIDEO';
const PLAY_VIDEO = 'PLAY_VIDEO';
const ADD_VIDEO = 'ADD_VIDEO';
const STOP_VIDEO = 'STOP_VIDEO';

function log(event, data) {
    switch(event) {
        case ADD_VIDEO:
            console.log(`emitting ${event} with video ${data}`)
            break;
        default:
            console.log(`emitting ${event}`);
    }
}

// publishes play event
export const emitPlay = () => {
    socket.emit(PLAY_VIDEO);
}


// publishes pause event
export const emitPause = () => {
    socket.emit(PAUSE_VIDEO);
}

// publishes seek event

// publishes add event
export const emitAdd = (video) => {
    log(ADD_VIDEO, video);
    socket.emit(ADD_VIDEO, video);
};

// listens for add events
export const listenAdd = (callback) => {
    socket.on(ADD_VIDEO, callback)
}

// listens for init event
export const listenInit = () => {
    socket.on(PLAYER_STATE)
}