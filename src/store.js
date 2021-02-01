import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import history from './reducers/history';
import player from './reducers/player'
import socketEvents from './reducers/socket-event';

export default function configureStore() {
    let reducer = combineReducers({
        history: history,
        player: player,
        socketEvents: socketEvents
    });

    return createStore(reducer, applyMiddleware(thunk));
}