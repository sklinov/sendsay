import { takeEvery, put } from 'redux-saga/effects';
import sendMessage from '../utils/sendMessage'

const messageSentSaga = function* (action) {
    const { payload } = action;
    console.log('MESSAGE SENT SAGA MAGIC GOES HERE', payload); 
    //DO THE MAGIC
    let result = yield sendMessage(payload);
    yield console.log(result);
    yield put({type: 'MESSAGE_SENT_ASYNC'});
}

const getMessagesFromAPI = function* (action) {
    const { payload } = action;
    console.log('SAGA MAGIC GOES HERE', payload); 
    //DO THE MAGIC
    yield put({type: 'GET_MESSAGES_ASYNC'});
}

export function* watchMessageSent() {
    yield takeEvery('MESSAGE_SENT', messageSentSaga);
}

export function* watchGetMessages() {
    yield takeEvery('GET_MESSAGES', getMessagesFromAPI);
}