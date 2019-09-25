import { applyMiddleware, createStore, compose } from 'redux'
import RootReducer from '../redux/reducers'
import { middleWares } from '../redux/store/createStore' 


export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test="${attr}"]`);
    return wrapper;
}

export function testStore() {
    const initialState={};
    const store = createStore(RootReducer, 
        initialState,
        compose(
            applyMiddleware(...middleWares)
        ))
        return store;
}

 