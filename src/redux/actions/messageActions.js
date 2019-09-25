import { SEND_MESSAGE, GET_STATUS, NEW_MESSAGE } from './types'
import sendMessageSendsay from '../../utils/sendMessage'
import getStatusSendsay from '../../utils/getStatus'

export const sendMessage = (message) => (dispatch) => {
  return new Promise((resolve) => {
    sendMessageSendsay(message)
    .then((res) => resolve(dispatch(
      {
        type: SEND_MESSAGE,
        message: {
          date: new Date(),
          subject: message.subject,
          trackId: res['track.id'],
          status: 0
        },
        prevToEmail: message.toEmail
      }
    )))
  })
}

export const getStatus = (message) => (dispatch) => {
  getStatusSendsay(message)
  .then((res) => dispatch(
    {
      type: GET_STATUS,
      trackId: message.trackId,
      status: res.obj.status
    }
  ))
}

export const newMessage = () => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE
  })
}

