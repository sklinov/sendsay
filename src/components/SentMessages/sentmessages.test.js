import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr} from '../../utils/index';
import SentMessages from './index';

const setup = (props={}) => {
    const component = shallow(<SentMessages {...props} />);
    return component;
}

describe('Sent Messages ---',() => {
    let component;
    
    describe('Renders:', () => {
        it('renders without props',()=> {
            component = setup();
            const wrapper = findByTestAttr(component, 'none');
            expect(wrapper.length).toEqual(1);
        });

        it('renders with sentMessages props',()=> {
            const props = 
            {
                sentMessages: [
                    {
                        date: "10 сентября" , 
                        subject: "Тестовая тема" ,
                        status: "Тестовый статус"
                    },
                    {
                        date: "12 сентября" , 
                        subject: "Тестовая тема" ,
                        status: "Тестовый статус"
                    },
                ]
            }
            ;
            const length = props.sentMessages.length;
            console.log("length: ",length);
            component = setup(props);
            const wrapper = findByTestAttr(component, 'message_item');
            expect(wrapper.length).toEqual(length);
        });
    });
    
});