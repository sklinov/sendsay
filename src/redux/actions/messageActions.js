import { SEND_MESSAGE, GET_STATUS, NEW_MESSAGE } from './types'
import sendMessageSendsay from '../../utils/sendMessage'
import getStatusSendsay from '../../utils/getStatus'

export const sendMessage = (message) => (dispatch) => {
  sendMessageSendsay(message)
  .then((res) => dispatch(
    {
      type: SEND_MESSAGE,
      message: {
        date: new Date(),
        subject: message.subject,
        trackId: res['track.id']
      },
      prevToEmail: message.toEmail
    }
  ))
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

