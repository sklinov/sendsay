import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr} from '../../utils/index';
import Logo from './index';

const setup = (props={}) => {
    const component = shallow(<Logo {...props} />);
    return component;
}

describe('Logo ---',() => {
    let component;
    beforeEach(() => {
        component = setup();
    })
    
    it('has 2 circles',()=> {
        const wrapper = findByTestAttr(component, 'circle');
        expect(wrapper.length).toEqual(2);
    });
    it('has 1 rectangle',()=> {
        const wrapper = findByTestAttr(component, 'rectangle');
        expect(wrapper.length).toEqual(1);
    });
    it('has 1 skewed rectangle',()=> {
        const wrapper = findByTestAttr(component, 'skew');
        expect(wrapper.length).toEqual(1);
    });
});