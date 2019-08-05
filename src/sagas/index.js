import { takeEvery, put } from 'redux-saga/effects';

const sendMessageToAPI = function* (action) {
    const { payload } = action.payload;
    console.log('SAGA MAGIC GOES HERE', payload); 
    //DO THE MAGIC
    yield put({type: 'SEND_MESSAGE_ASYNC'});
}


export function* watchSendMessage() {
    yield takeEvery('SEND_MESSAGE', sendMessageToAPI);
}