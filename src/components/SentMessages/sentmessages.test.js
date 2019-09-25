import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr} from '../../utils/index';
import { SentMessages } from './index';

const setup = (props={}) => {
    const component = shallow(<SentMessages {...props} />);
    return component;
}

describe('Sent Messages ---',() => {
    let component;
    
    describe('Renders:', () => {
        it('renders with empty messages props',()=> {
            const props = {
                messages: []
            }
            component = setup(props);
            const wrapper = findByTestAttr(component, 'none');
            expect(wrapper.length).toEqual(1);
        });

        it('renders with messages props',()=> {
            const props = 
            {
                messages: [
                    {   
                        trackId: 5,
                        date: new Date() , 
                        subject: "Тестовая тема" ,
                        status: 0
                    },
                    {   
                        trackId: 777,
                        date: new Date() , 
                        subject: "Тестовая тема" ,
                        status: -1
                    },
                ]
            }
            const length = props.messages.length;
            component = setup(props);
            const wrapper = findByTestAttr(component, 'message_item');
            expect(wrapper.length).toEqual(length);
        });
    });
    
});