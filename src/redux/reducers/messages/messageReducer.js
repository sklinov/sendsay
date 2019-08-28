import { SEND_MESSAGE, GET_STATUS } from '../../actions/types'


const initialState = {
    messages : [
        // {
        //     date: new Date(),
        //     subject: 'Слишком длинная для восприятия человеческим мозгом тема сообщения отправленная через службу sendsay',
        //     trackId: 111
        // }
    ],
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
                ]
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
        default:
            return state;
    }

}