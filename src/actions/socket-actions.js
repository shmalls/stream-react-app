import io from "socket.io-client";

const ENDPOINT = "http://69.154.54.105:4001";
const config = {
    withCredentials: true,
    extraHeaders: { "custom-headers": "test" }
};
const socket = io(ENDPOINT, config);

const CLIENT_PAUSE_VIDEO = 'CLIENT_PAUSE_VIDEO';
const CLIENT_PLAY_VIDEO = 'CLIENT_PLAY_VIDEO';
const CLIENT_ADD_VIDEO = 'CLIENT_ADD_VIDEO';
const CLIENT_STOP_VIDEO = 'CLIENT_STOP_VIDEO';

const SERVER_INIT_PLAYER = 'SERVER_INIT_PLAYER';
const SERVER_PAUSE_VIDEO = 'SERVER_PAUSE_VIDEO';
const SERVER_PLAY_VIDEO = 'SERVER_PLAY_VIDEO';
const SERVER_ADD_VIDEO = 'SERVER_ADD_VIDEO';
const SERVER_STOP_VIDEO = 'SERVER_STOP_VIDEO';


function log(event, data) {
    switch(event) {
        case CLIENT_ADD_VIDEO:
            console.log(`emitting ${event} with video ${data}`)
            break;
        case SERVER_INIT_PLAYER:
            console.log(`heard ${event} with data ${data}`);
            break;
        case SERVER_ADD_VIDEO:
            console.log(`heard ${event} with video ${data}`);
            break;
        default:
            console.log(`socket event ${event} with data ${data}`);
    }
}

// publishes play event
export const emitPlay = () => {
    log(CLIENT_PLAY_VIDEO);
    socket.emit(CLIENT_PLAY_VIDEO);
}

// publishes pause event
export const emitPause = () => {
    log(CLIENT_PAUSE_VIDEO);
    socket.emit(CLIENT_PAUSE_VIDEO);
}

// publishes stop event
export const emitStop = () => {
    log(CLIENT_STOP_VIDEO);
    socket.emit(CLIENT_STOP_VIDEO);
}

// publishes seek event

// publishes add event
export const emitAdd = (video) => {
    log(CLIENT_ADD_VIDEO, video);
    socket.emit(CLIENT_ADD_VIDEO, video);
};

// listens for play event
export const listenPlay = (callback) => {
    socket.on(SERVER_PLAY_VIDEO, (data) => {
        log(SERVER_PLAY_VIDEO, data);
        callback(data);
    });
}

// listens for pause event
export const listenPause = (callback) => {
    socket.on(SERVER_PAUSE_VIDEO, (data) => {
        log(SERVER_PAUSE_VIDEO, data);
        callback(data);
    });
}

// listens for stop event
export const listenStop = (callback) => {
    socket.on(SERVER_STOP_VIDEO, (data) => {
        log(SERVER_STOP_VIDEO, data);
        callback(data);
    });
}

// listens for add events
export const listenAdd = (callback) => {
    socket.on(SERVER_ADD_VIDEO, (video) => {
        log(SERVER_ADD_VIDEO, video);
        callback(video);
    })
}

// listens for init event
export const listenInit = (callback) => {
    socket.on(SERVER_INIT_PLAYER, (player) => {
        log(SERVER_INIT_PLAYER, player);
        callback(player);
    })
}