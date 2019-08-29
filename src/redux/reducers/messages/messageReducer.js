import { SEND_MESSAGE, GET_STATUS, NEW_MESSAGE } from '../../actions/types'


const initialState = {
    messages : [],
    isSent: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: 
        {
            // Have to get date, track.id, subject, session(?)
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message
                ],
                isSent: true
            }; 
        }
        case GET_STATUS: 
        {
            // Have to get track.id, obj.status
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