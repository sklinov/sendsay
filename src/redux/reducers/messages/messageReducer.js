import { SEND_MESSAGE } from '../../actions/messageActions';

const initialState = {
    messages : [],
    message: { }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: 
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