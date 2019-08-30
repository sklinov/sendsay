import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'


import SendMessageSendsay from '../utils/sendMessage'
//import {testStore} from '../utils'
import {sendMessage, getStatus, newMessage} from '../redux/actions/messageActions'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)



jest.mock('../utils/sendMessage');

describe('sendMessage action', ()=> {

    const message = {
        subject: 'Тема сообщения',
        toEmail: 'sergeyklinov@gmail.com'
    }

    test('Send message: Should update store correctly', () => {
        //const date = new Date();
        const store = mockStore({})
        //const store = testStore();
        const referenceState = {
            messages: {
              messages: [
                {
                  date: '2019-08-30T11:36:14.813Z',
                  subject: 'Тема сообщения',
                  trackId: '95'
                }
              ],
              isSent: true,
              prevToEmail: 'sergeyklinov@gmail.com'
            }
          }
        SendMessageSendsay.mockResolvedValue({'track.id' : '95' })
        store.dispatch(sendMessage(message))
        const newState = store.getState();
        console.log(newState);
        expect(newState).toBe(referenceState);      
        
    })
});
