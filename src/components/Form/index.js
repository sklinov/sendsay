import React, { Component } from 'react'
import DragDropFiles from '../DragDropFiles'
import uuid from 'uuid'
import { form, errors } from '../../languages/ru'
import './styles.css'
import paperclip from '../../imgs/paperclip.svg'
import trash from '../../imgs/trash.svg'

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromName: "",
            fromEmail: "",
            toName: "",
            toEmail: "",
            subject: "",
            messageText: "",
            files: [],
            validationErrors: {
                fromName: false,
                fromEmail: false,
                toName: false,
                toEmail: false,
                subject: false,
                messageText: false,
            } 
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name] : e.target.value });
    }

    addFiles = (e) => {
        var file = e.target.files[0];
        this.setState({files: [...this.state.files, file]});
    }

    handleDragDropFile = (files) => {        
        this.setState({files: [...this.state.files, ...files]})
    }

    deleteFile = (e, fileToDelete) => {
        e.preventDefault();
        const { files } = this.state;
        var newFiles = files.filter(file => file!== fileToDelete);
        this.setState({files: newFiles});
    }

    processFileName = (filename) => {
        const max_filename_length = 20;
        if(filename.length > max_filename_length) {
            let end = filename.slice(-4);
            let start = filename.slice(0,13);
            return start + '...' + end;
        }
        else {
            return filename;
        }   
    }

    validateField = (e) => {
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
            default:
                console.log('DEFAULT',value);
        }
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    render() {
        const { fromName, fromEmail, toName, toEmail, subject, messageText, files } = this.state;
        return (
            <div data-test="form" className="form__container">
            <DragDropFiles handleDrop={this.handleDragDropFile}>
            <div>
                <h1 className="form__header">{form.header}</h1>
                <form>
                    <div className="form__group" data-test="form__group">
                        <label htmlFor="fromName"
                               className="form__label">
                               {form.fromLabel}
                        </label>
                        <br />
                        <input 
                            type="text"
                            className="form__input" 
                            placeholder={form.namePlaceholder}
                            name="fromName"
                            value={fromName} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                        <input 
                            type="email"
                            className="form__input"  
                            placeholder={form.emailPlaceholder}
                            name="fromEmail"
                            value={fromEmail} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                    </div>
                    <div className="form__group" data-test="form__group">
                        <label htmlFor="toName"
                              className="form__label">
                              {form.toLabel}
                        </label>
                        <br />
                        <input 
                            type="text"
                            className="form__input"  
                            placeholder={form.namePlaceholder}
                            name="toName"
                            value={toName} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                        <input 
                            type="email"
                            className="form__input"  
                            placeholder={form.emailPlaceholder}
                            name="toEmail"
                            value={toEmail} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                    </div>
                    <div className="form__group" data-test="form__group">
                        <label htmlFor="subject" 
                                className="form__label">
                                {form.subjectLabel}
                        </label>
                        <br />
                        <input 
                            type="text"
                            className="form__input form__input-fullwidth"  
                            placeholder={form.subjectPlaceholder}
                            name="subject"
                            value={subject} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                    </div>
                    <div className="form__group" data-test="form__group">
                        <label htmlFor="messageText"
                                className="form__label">
                                {form.messageLabel}
                        </label>
                    <br />
                        <textarea 
                            className="form__input form__input-fullwidth form__input-textarea"
                            placeholder={form.messagePlaceholder}
                            name="messageText"
                            value={messageText} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                        />
                    </div>
                    <div className="form__group" data-test="form__group">
                        {    
                            files.length > 0 && 
                                <div className="form__files">
                                {
                                    files.map(file => {
                                        return (
                                            <div className="form__filecontainer" key={uuid.v4()}>
                                                <img src={paperclip} className="form__paperclip-desaturated" alt="paperclip" />
                                                <span className="form__filename">
                                                    {this.processFileName(file.name)}
                                                </span>
                                                <span className="form__filedelete"
                                                      onClick={(e) => this.deleteFile(e, file)}>
                                                    <img src={trash} alt="Удалить" />
                                                    Удалить
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                                </div>   
                        }
                        <label htmlFor="files" 
                                    className="form__label">
                                    <img src={paperclip} alt="paperclip" />
                                    <span className="form__label form__label-blue form__link">
                                        {form.attach}
                                    </span> 
                        <input 
                            type="file"
                            className="form__filebutton"  
                            placeholder={form.subjectPlaceholder}
                            id="files"
                            name="files"
                            onChange={this.addFiles}
                        />
                        </label>
                        
                    </div>
                    <div className="form__group" data-test="form__group">
                        <button
                            className="form__button"
                            onClick={this.submitForm}>
                            {form.buttonSubmitLabel}
                        </button>
                    </div>
                </form>
            </div>
            </DragDropFiles>
            </div>
        )
    }
}
