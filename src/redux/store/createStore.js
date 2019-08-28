import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers';

const initialState = {}
const middleWares = [thunk];

export default function(){
  const store = createStore(RootReducer, 
    initialState,
    compose(
    applyMiddleware(...middleWares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
    return store;
}
        
 