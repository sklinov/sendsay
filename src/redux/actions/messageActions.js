export const SEND_MESSAGE = "SEND_MESSAGE";

export function sendMessage(payload) {
  return {
    type: SEND_MESSAGE,
    payload
  };
}

