import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import history from './reducers/history';

export default function configureStore() {
    let reducer = combineReducers({
        history: history
    });

    return createStore(reducer, applyMiddleware(thunk));
}