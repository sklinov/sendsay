import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findByTestAttr} from './utils';

describe('Top level app test', () => {
  it('renders without crashing', () => {
    const app = shallow(<App />);
    const wrapper = findByTestAttr(app, 'App');
    expect(wrapper.length).toBe(1);
  });
})

