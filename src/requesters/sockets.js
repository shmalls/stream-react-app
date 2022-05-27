import io from "socket.io-client";

const ENDPOINT = "http://localhost:4001";
const config = {
    withCredentials: true,
    extraHeaders: { "custom-headers": "test" }
};
const socket = io(ENDPOINT, config);

const RECEIVING = "RECEIVING"
const SENDING = "SENDING";
const POST = 'POST'
const GET = 'GET'

export const TAKE_CONTROL_EVENT = { id: 'TAKE_CONTROL', type: SENDING, method: POST }

export const CLIENT_PAUSE_VIDEO = { id: 'CLIENT_PAUSE_VIDEO', type: SENDING, method: POST };
export const CLIENT_PLAY_VIDEO = { id: 'CLIENT_PLAY_VIDEO', type: SENDING, method: POST };
export const CLIENT_SEEK_VIDEO = { id: 'CLIENT_SEEK_VIDEO', type: SENDING, method: POST };
export const CLIENT_ADD_VIDEO = { id: 'CLIENT_ADD_VIDEO', type: SENDING };
export const CLIENT_STOP_VIDEO = { id: 'CLIENT_STOP_VIDEO', type: SENDING };
export const CLIENT_END_VIDEO = { id: 'CLIENT_END_VIDEO', type: SENDING };
export const CLIENT_GET_PLAYER = { id: 'CLIENT_PLAY_VIDEO', type: SENDING, method: GET };

export const SERVER_INIT_PLAYER = { id: 'SERVER_INIT_PLAYER', type: RECEIVING };
export const SERVER_PAUSE_VIDEO = { id: 'SERVER_PAUSE_VIDEO', type: RECEIVING };
export const SERVER_PLAY_VIDEO = { id: 'SERVER_PLAY_VIDEO', type: RECEIVING };
export const SERVER_ADD_VIDEO = { id: 'SERVER_ADD_VIDEO', type: RECEIVING };
export const SERVER_STOP_VIDEO = { id: 'SERVER_STOP_VIDEO', type: RECEIVING };
export const SERVER_PLAYER_STATE = { id: 'SERVER_PLAYER_STATE', type: RECEIVING};


function log(event, data, callback) {
    switch (event.type) {
        case SENDING:
            console.log(`Sending event ${event.id} ${callback ? `with callback ${callback} and data` : 'with data'} ${JSON.stringify(data)}`);
            break;
        case RECEIVING:
            console.log(`Received event ${event.id} ${callback ? `with callback ${callback} and data` : 'with data'} ${JSON.stringify(data)}`);
            break;
    }
}

export function emitLog(event, data, callback) {
    log(event, data, callback);
    socket.emit(event.id, data, callback);
}

export function emitLogPromise(event) {
    // log(event, data, callback);
    return new Promise((resolve, reject)=> {
        socket.emit(event.id, (err, response) => {
            if(err) {
                return reject(err);
            }
            return resolve(response);
        });
    })
}

export async function newEmit(event, data) {
    log(event, data)
    return new Promise((resolve, reject) => {
        socket.emit(event.id, event.method, data, (err, response) => {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        })
    })
}

// publishes take control
export const emitTakeControl = () => {
    log(TAKE_CONTROL_EVENT);
    // emitLogPromise(TAKE_CONTROL_EVENT)
    return new Promise((resolve, reject)=> {
        socket.emit(TAKE_CONTROL_EVENT.id, (err, response) => {
            if(err) {
                return reject(err);
            }
            return resolve(response);
        });
    })
}

// publishes play event
export const emitPlay = (player) => {
    log(CLIENT_PLAY_VIDEO, player);
    emitLog(CLIENT_PLAY_VIDEO, player);
}

// publishes pause event
export const emitPause = (player) => {
    log(CLIENT_PAUSE_VIDEO, player);
    emitLog(CLIENT_PAUSE_VIDEO, player);
}

// publishes stop event
export const emitStop = (player) => {
    log(CLIENT_STOP_VIDEO, player);
    emitLog(CLIENT_STOP_VIDEO, player);
}

// publishes seek event

// publishes add event
export const emitAdd = (video) => {
    log(CLIENT_ADD_VIDEO, video);
    emitLog(CLIENT_ADD_VIDEO, video);
};

// publishes add event
export const emitEnd = () => {
    log(CLIENT_END_VIDEO);
    emitLog(CLIENT_END_VIDEO);
};

// listens for play event
export const listenPlay = (callback) => {
    socket.on(SERVER_PLAY_VIDEO.id, (data) => {
        log(SERVER_PLAY_VIDEO, data);
        callback(data);
    });
}

// listens for pause event
export const listenPause = (callback) => {
    socket.on(SERVER_PAUSE_VIDEO.id, (data) => {
        log(SERVER_PAUSE_VIDEO, data);
        callback(data);
    });
}

// listens for stop event
export const listenStop = (callback) => {
    socket.on(SERVER_STOP_VIDEO.id, (data) => {
        log(SERVER_STOP_VIDEO, data);
        callback(data);
    });
}

// listens for add events
export const listenAdd = (callback) => {
    socket.on(SERVER_ADD_VIDEO.id, (video) => {
        log(SERVER_ADD_VIDEO, video);
        callback(video);
    })
}

// listens for init event
export const listenInit = (callback) => {
    socket.on(SERVER_INIT_PLAYER.id, (player) => {
        log(SERVER_INIT_PLAYER, player);
        callback(player);
    })
}

export const listenPlayerState = (callback) => {
    socket.on(SERVER_PLAYER_STATE.id, (player)=> {
        log(SERVER_PLAYER_STATE, player);
        callback(player);
    });
}
