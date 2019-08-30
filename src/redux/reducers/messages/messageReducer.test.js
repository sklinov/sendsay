import {  SEND_MESSAGE, GET_STATUS, NEW_MESSAGE } from './../../actions/types'
import messageReducer, {initialState} from './messageReducer'


describe('Messages reducer', ()=> {
    it('should return default state', () => {
        const newState = messageReducer(undefined, {});
        expect(newState).toEqual(initialState);
    })

    it('should return correct state if SEND_MESSAGE action received', () => {
        const date = new Date();
        const referenceState = {
            messages: [
                {
                    date: date,
                    subject: 'Test subject',
                    trackId: 5
                }
            ],
            isSent: true,
            prevToEmail: 'test@mail.com'
        } 
        const action = {
            type: SEND_MESSAGE,
            message: {
                date: date,
                subject: 'Test subject',
                trackId: 5
            },
            prevToEmail: 'test@mail.com'
        }
        const newState = messageReducer(undefined, action);
        expect(newState).toEqual(referenceState);
    })

    it('should return correct state if GET_STATUS action received', () => {
        const date = new Date();
        
        const initialState = {
            messages: [
                {
                    date: date,
                    subject: 'Test subject',
                    trackId: 5,
                },
                {
                    date: date,
                    subject: 'Test subject',
                    trackId: 4,
                }
            ],
            isSent: true,
            prevToEmail: 'test@mail.com'
        } 
        
        const referenceState = {
            messages: [
                {
                    date: date,
                    subject: 'Test subject',
                    trackId: 5,
                    status: -1,
                },
                {
                    date: date,
                    subject: 'Test subject',
                    trackId: 4,
                }
            ],
            isSent: true,
            prevToEmail: 'test@mail.com'
        } 
        const action = {
            type: GET_STATUS,
            trackId: 5,
            status: -1
        }
        const newState = messageReducer(initialState, action);
        expect(newState).toEqual(referenceState);
    })

    it('should return correct state if NEW_MESSAGE action received', () => {
        const initialState = {
            isSent: true
        }
        const referenceState = {
            isSent: false
        }
        const action = {
            type: NEW_MESSAGE
        }
        const newState = messageReducer(initialState, action);
        expect(newState).toEqual(referenceState);
    }
)
})