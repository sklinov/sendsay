import { combineReducers } from 'redux';
import messageReducer from './messages/messageReducer';

export default combineReducers({
    messages: messageReducer
});