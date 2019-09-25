import { errors } from '../languages/ru'

export const leftSideTrim = (value) => {
    if(value === null) 
    { 
        return value;
    }
    return value.replace(/^\s+/g, '');
  }

export const validateField = function(state,e) {
    e.preventDefault();
    const { value, name } = e.target;
    const { validationErrors } = this.state;
    switch(name) {
        case name.match(/\S*(Name)/i) && name :
            if(value.length === 0) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.nameEmpty} }); 
            }
            else if(value.length <3) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.nameTooShort} }); 
            }
            break;
        case name.match(/\S*(Email)/i) && name:
            if(value.length === 0) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.emailEmpty} }); 
            }
            else if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.emailNotValid} }); 
            }
            break;
        case name.match(/\S*(subject)/i) && name:
            if(value.length === 0) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.subjectEmpty} }); 
            }
            break;
        case name.match(/\S*(text)/i) && name:
            if(value.length === 0) {
                this.setState({ validationErrors: {...validationErrors, [name]: errors.textEmpty} }); 
            }
            break;
        default:
            break;
    }
}