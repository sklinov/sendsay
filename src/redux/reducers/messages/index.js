import { SEND_MESSAGE } from '../../actions/messages';

export default (state=[], action) => {
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