import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage, newMessage } from '../../redux/actions/messageActions'
import DragDropFiles from '../DragDropFiles'
import uuid from 'uuid'
import { form, errors } from '../../languages/ru'
import './styles.css'
import paperclip from '../../imgs/paperclip.svg'
import trash from '../../imgs/trash.svg'

const initialState = {
    fromName: "Сергей",
    fromEmail: "me@sklinov.pro",
    toName: "Вася",
    toEmail: "vasya@simplemail.top",
    subject: "Тестовая тема",
    messageText: "Тестовый текст",
}

class Form extends Component {
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
            },
            formIsValid: false,
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const value = this.leftSideTrim(e.target.value);
        const { validationErrors } = this.state;
        this.setState({ validationErrors: {...validationErrors, [e.target.name]: false} }); 
        this.setState({ [e.target.name] : value });
        this.validateForm();
    }

    leftSideTrim = (value) => {
        if(value === null) 
        { 
            return value;
        }
        return value.replace(/^\s+/g, '');
      }

    addFiles = (e) => {
        var files = [];
        if(e.target.files.length>0)
        {
            files.push(e.target.files[0]);
            var checkedFiles = this.checkFilesExtAndSize(files);
            this.addFilesToState(checkedFiles);
        }
    }

    handleDragDropFile = (fileList) => {
        const files = [...fileList];
        var checkedFiles = this.checkFilesExtAndSize(files);
        this.addFilesToState(checkedFiles);        
    }

    checkFilesExtAndSize = (files) => {
        const sizeLimit = 5242880;
        const totalSizeLimit = 20971520;
        const fileTypes = [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/gif',
            'application/zip',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword'
        ];

        const fileSizes = this.state.files.map(file => file.size);
        var totalSize = fileSizes.reduce( (total, size) => total+size, 0); 
        var checkedfiles = files.filter(file => {
            if(fileTypes.indexOf(file.type) !== -1 &&
               file.size <=sizeLimit && 
               file.size+totalSize <= totalSizeLimit)
            {   
                totalSize +=file.size;
                return file;
            }
            else {
                console.log(file, fileTypes.indexOf(file.type), file.type, file.size);
                alert(`Невозможно загрузить ${file.name}. Проверьте размер (< 5Мб) и тип файла. ${file.type}, ${file.size}`);
                return null;
            }
        })
        return checkedfiles;
    }

    addFilesToState = (files) => {
        if(files.length > 0)
        {
            this.setState({files: [...this.state.files, ...files]});
        }
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

    validateForm = () => {
        const { fromName, fromEmail, toName, toEmail, subject, messageText, validationErrors } = this.state;
        if(
            fromName.length > 0 &&
            fromEmail.length > 0 &&
            toName.length > 0 &&
            toEmail.length > 0 &&
            subject.length > 0 &&
            messageText.length > 0 &&
            Object.values(validationErrors).every(error => error === false)
        ) {
            this.setState({formIsValid: true}); 
        }
        else {
            this.setState({formIsValid: false}); 
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        const message = {
            fromName: this.state.fromName,
            fromEmail: this.state.fromEmail,
            toName: this.state.toName,
            toEmail: this.state.toEmail,
            subject: this.state.subject,
            messageText: this.state.messageText,
            files: this.state.files,
        };
        this.props.sendMessage(message);
    }

    clearForm = (e) => {
        e.preventDefault();
        this.setState(initialState, this.props.newMessage())
    }

    componentDidMount() {
        this.setState(initialState);
    }

    render() {
        const { fromName, fromEmail, toName, toEmail, subject, messageText, files, validationErrors, formIsValid } = this.state;
        if(this.props.isSent) {
            const regex = /[*][*][*]/
            let message = form.messageQueuedExtra.replace(regex, this.props.prevToEmail);
            
            return (
                <div data-test="form" className="form__sent" onClick={this.clearForm}>
                    <h1 className="form__header">
                        {form.messagequeued}
                    </h1>
                    <p className="form__sentp">
                        {message}
                    </p>
                </div>
            )
        }
        else {
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
                                        data-test="fromName" 
                                    />
                                    <input 
                                        type="email"
                                        className="form__input"  
                                        placeholder={form.emailPlaceholder}
                                        name="fromEmail"
                                        value={fromEmail} 
                                        onChange={this.handleChange}
                                        onBlur={this.validateField}
                                        data-test="fromEmail" 
                                    />
                                </div>
                                <div className="form__errorcontainer">
                                    {<div className="form__error">{validationErrors.fromName}</div>}
                                    {<div className="form__error">{validationErrors.fromEmail}</div>}
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
                                        data-test="toName"
                                    />
                                    <input 
                                        type="email"
                                        className="form__input"  
                                        placeholder={form.emailPlaceholder}
                                        name="toEmail"
                                        value={toEmail} 
                                        onChange={this.handleChange}
                                        onBlur={this.validateField}
                                        data-test="toEmail" 
                                    />
                                </div>
                                <div className="form__errorcontainer">
                                    {<div className="form__error">{validationErrors.toName}</div>}
                                    {<div className="form__error">{validationErrors.toEmail}</div>}
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
                                <div className="form__errorcontainer">
                                    {<div className="form__error">{validationErrors.subject}</div>}
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
                                <div className="form__errorcontainer">
                                    {<div className="form__error">{validationErrors.messageText}</div>}
                                </div>
                                <div className="form__group" data-test="form__group">
                                    {    
                                        files !== undefined && files.length > 0 && 
                                            <div className="form__files">
                                            {
                                                files.map(file => {
                                                    return (
                                                        <div className="form__filecontainer" key={uuid.v4()}>
                                                            <img src={paperclip} className="form__paperclip-desaturated" alt="paperclip" />
                                                            <span className="form__filename" title={file.name}>
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
                                        onClick={this.submitForm}
                                        disabled={!formIsValid}
                                    >
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
}

const mapStateToProps = state => ({
    isSent: state.messages.isSent,
    prevToEmail: state.messages.prevToEmail
})

export default connect(mapStateToProps, {sendMessage, newMessage})(Form)
