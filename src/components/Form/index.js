import React, { Component } from 'react'
import { form } from '../../languages/ru'
import './styles.css'
import paperclip from '../../imgs/paperclip.svg'

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromName: "",
            fromEmail: "",
            toName: "",
            toEmail: "",
            subject: "",
            messageText: ""

        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name] : e.target.value });
    }


    render() {
        const { fromName, fromEmail, toName, toEmail, subject, messageText } = this.state;
        return (
            <div data-test="form" className="form__container">
                <h1 className="form__header">{form.header}</h1>
                <form>
                    <div className="form__group">
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
                            onChange={this.handleChange} />
                        <input 
                            type="email"
                            className="form__input"  
                            placeholder={form.emailPlaceholder}
                            name="fromEmail"
                            value={fromEmail} 
                            onChange={this.handleChange} />
                    </div>
                    <div className="form__group">
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
                            onChange={this.handleChange} />
                        <input 
                            type="email"
                            className="form__input"  
                            placeholder={form.emailPlaceholder}
                            name="toEmail"
                            value={toEmail} 
                            onChange={this.handleChange} />
                    </div>
                    <div className="form__group">
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
                            onChange={this.handleChange} />
                    </div>
                    <div className="form__group">
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
                            onChange={this.handleChange} />
                    </div>
                    <div className="form__group">
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
                        />
                        </label>
                        
                    </div>
                </form>
            </div>
        )
    }
}
