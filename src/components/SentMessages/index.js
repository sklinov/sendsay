import React from 'react'
import './styles.css'
import { msgLabels } from '../../languages/ru'

function SentMessages(props) {
    const { sentMessages } = props;
    return (
        <div className="messages__container" data-test="sentmessages">
            <h1 className="messages__header">{msgLabels.header}</h1>
            {!sentMessages && 
                <div data-test="none">
                   {msgLabels.noneText} 
                </div>
            }
            {sentMessages && 
                <div data-test="table">
                    <table>
                        <thead>
                            <tr>
                                <td>{msgLabels.dateLabel}</td>
                                <td>{msgLabels.subjectLabel}</td>
                                <td>{msgLabels.statusLabel}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sentMessages.map(message => {
                                    return (
                                        <tr data-test="message_item">
                                            <td>{message.date}</td>
                                            <td>{message.subject}</td>
                                            <td>{message.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                   {msgLabels.noneText} 
                </div>
            }
        </div>
    )
}

export default SentMessages
