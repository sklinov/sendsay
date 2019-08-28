import { MESSAGE_SENT } from '../../actions/messageActions';
import { GET_MESSAGES } from '../../actions/messageActions';

const initialState = {
    messages : [],
    message: { }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_SENT: 
        {
            return ( state ) 
            // console.log(action.payload);
            // return (
            //     {...state, messages:[...state.messages, action.payload] }
            // )
        }
        case GET_MESSAGES: 
        {
            console.log(action.payload);
            return (
                state
            )
        }
        default:
            return state;
    }

}