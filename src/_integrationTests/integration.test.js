import SendMessageSendsay from '../utils/sendMessage'
import {testStore} from '../utils'
import {sendMessage } from '../redux/actions/messageActions'

jest.mock('../utils/sendMessage');

describe('sendMessage action', ()=> {
    const message = {
        subject: 'Message subject',
        toEmail: 'receiver@fakegmail.com'
    }

    test('Send message: Should update store correctly', () => {
        const store = testStore();
        const referenceState = {
            messages: {
              messages: [
                {
                  subject: 'Message subject',
                  trackId: '95'
                }
              ],
              isSent: true,
              prevToEmail: 'receiver@fakegmail.com'
            }
          }
        
        SendMessageSendsay.mockResolvedValue({'track.id' : '95' })       
        
        return store.dispatch(sendMessage(message))
        .then(() => {
          const newState = store.getState();
          expect(newState).toMatchObject(referenceState); 
        })
        
    })
});
