import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import RootReducer from '../reducers'
import { watchSendMessage } from '../../sagas/';

const sagaMiddleware = createSagaMiddleware();

export default function() {
    const store = createStore(
        RootReducer,
        compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      );
      sagaMiddleware.run(watchSendMessage);
      return store;
} 