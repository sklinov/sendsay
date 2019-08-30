import { SEND_MESSAGE, GET_STATUS, NEW_MESSAGE } from '../../actions/types'

export const initialState = {
    messages : [],
    isSent: false,
    prevToEmail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: 
        {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message
                ],
                isSent: true,
                prevToEmail: action.prevToEmail
            }; 
        }
        case GET_STATUS: 
        {
            var messagesUpdated = state.messages;
            messagesUpdated.forEach(message => {
                if(message.trackId === action.trackId) {
                    message.status = action.status;
                }
                return message;
            })
            return {
                ...state,
                messages: messagesUpdated 
            };
        }
        case NEW_MESSAGE: 
        {
            return {
                ...state,
                isSent: false
            }
        }
        default:
            return state;
    }

}