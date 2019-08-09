import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMessages } from '../../redux/actions/messageActions'
import './styles.css'
import { msgLabels } from '../../languages/ru'

class SentMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        let payload = { id: 1};
        this.props.getMessages(payload);
    }

    render() {
    const { sentMessages } = this.props;
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
}

export default connect(null, { getMessages })(SentMessages)
