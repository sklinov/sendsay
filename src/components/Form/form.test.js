import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr} from '../../utils/index';
import Form from './index';
import { errors } from '../../languages/ru' 

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
        it('has 5 form groups',()=> {
            const wrapper = findByTestAttr(component, 'form__group');
            expect(wrapper.length).toEqual(6);
        });
    });
    describe('Validation:', () => {
        it('Shows error when fromName is too short', ()=> {
            const ctrlValue = 'a';
            const inputName = 'fromName';
            const simProps = {
                    target: { name: inputName,
                    value: ctrlValue}, 
                    preventDefault: () => {}
                    };

            const wrapper = findByTestAttr(component, inputName);
            wrapper.simulate('change', simProps);
            expect(component.state(inputName)).toEqual(ctrlValue);
            wrapper.simulate('blur', simProps);
            expect(component.state().validationErrors[inputName]).toEqual(errors.nameTooShort);
        });
        it('Shows error when fromName is too short', ()=> {
            const ctrlValue = '';
            const inputName = 'fromName';
            const simProps = {
                    target: { name: inputName,
                    value: ctrlValue}, 
                    preventDefault: () => {}
                    };

            const wrapper = findByTestAttr(component, inputName);
            wrapper.simulate('change', simProps);
            expect(component.state(inputName)).toEqual(ctrlValue);
            wrapper.simulate('blur', simProps);
            expect(component.state().validationErrors[inputName]).toEqual(errors.nameEmpty);
        });
        it('Shows error when toEmail is on wrong format', ()=> {
            const ctrlValue = 'sdfg.ru';
            const inputName = 'toEmail';
            const simProps = {
                    target: { name: inputName,
                    value: ctrlValue}, 
                    preventDefault: () => {}
                    };

            const wrapper = findByTestAttr(component, inputName);
            wrapper.simulate('change', simProps);
            expect(component.state(inputName)).toEqual(ctrlValue);
            wrapper.simulate('blur', simProps);
            expect(component.state().validationErrors[inputName]).toEqual(errors.emailNotValid);
        });
        it('Should validate form', ()=> {
            const state = {
                fromName: "Test Name",
                fromEmail: "vasya@mail.ru",
                toName: "Test Name",
                toEmail: "kolya@mail.ru",
                subject: "Test Subject",
                messageText: "Message Text",
                files: [],
                validationErrors: {
                    fromName: false,
                    fromEmail: false,
                    toName: false,
                    toEmail: false,
                    subject: false,
                    messageText: false,
                },
                formIsValid: false
            };
            component.setState(state);
            const instance = component.instance();
            instance.validateForm()
            expect(component.state('formIsValid')).toBe(true);
        });
        it('Process long file name', () => {
            const filename = "filenamemorethantwentysymbols.jpg";
            const instance = component.instance();
            expect(instance.processFileName(filename)).toEqual('filenamemoret....jpg');
        });
        it('Leaves short file name', () => {
            const filename = "filename.jpg";
            const instance = component.instance();
            expect(instance.processFileName(filename)).toEqual(filename);
        });
    });
    
});