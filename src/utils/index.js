import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from '../redux/reducers'
import { middleWares } from '../redux/store/createStore' 


export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test="${attr}"]`);
    return wrapper;
}

export const testStore = () => {
    const initialState={};
    const store = createStore(rootReducer, 
        initialState,
        compose(
            applyMiddleware(...middleWares)
        ))
        return store;
}

