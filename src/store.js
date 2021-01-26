import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import history from './reducers/history';
import addVideo from './reducers/addVideo';

export default function configureStore() {
    let reducer = combineReducers({
        history: history,
        addVideo: addVideo
    });

    return createStore(reducer, applyMiddleware(thunk));
}