import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr} from '../../utils/index';
import Form from './index';

const setup = (props={}) => {
    const component = shallow(<Form {...props} />);
    return component;
}

describe('Form ---',() => {
    let component;
    beforeEach(() => {
        component = setup();
    })
    describe('Renders:', () => {
        it('renders main container',()=> {
            const wrapper = findByTestAttr(component, 'form');
            expect(wrapper.length).toEqual(1);
        });
    });
    
});