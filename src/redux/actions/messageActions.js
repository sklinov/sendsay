export const MESSAGE_SENT = "MESSAGE_SENT";
export const GET_MESSAGES = "GET_MESSAGES";

export function messageSent(payload) {
  return {
    type: MESSAGE_SENT,
    payload
  };
}

export function getMessages(payload) {
  return {
    type: GET_MESSAGES,
    payload
  };
}

