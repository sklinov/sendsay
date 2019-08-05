import { types } from './../../actions/types'
import messageReducer from './index'

describe('Messages reducer', ()=> {
    it('should return default state', () => {
        const newState = messageReducer(undefined, {});
        expect(newState).toEqual([]);
    })

    it('should return new state if type received', () => {
        
    })
})