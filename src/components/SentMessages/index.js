import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStatus } from '../../redux/actions/messageActions'
import './styles.css'
import { msgLabels } from '../../languages/ru'

export class SentMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trigger: false
        }
    }
    componentDidUpdate(prevProps) {
        if((this.props.messages.length > prevProps.messages.length ||
            this.props.messages !== prevProps.messages) &&
            this.props.messages.length > 0 ) {
                this.getStatuses();
        }
    }

    getStatuses = () => {
        this.props.messages.forEach(message => {
            this.props.getStatus(message);
        })
    }

    processStatus = (status) => {
        var statusName;
        var statusColor;
        if(parseInt(status) === -1)
        {
            statusName = 'Отправлено';
            statusColor = '#03A100';
        }
        else if(parseInt(status) < -1)
        {
            statusName = 'Ошибка';
            statusColor = '#FF6666';
        } 
        else if(parseInt(status) > -1)
        {
            statusName = 'В очереди';
            statusColor = '#DDDDDD';
        }
        return <span style={{color: statusColor}}>{statusName}</span>
    }

    render() {
    const { messages } = this.props;
    return (
        <div className="messages__container" data-test="messages">
            <h1 className="messages__header">{msgLabels.header}</h1>
            {messages.length === 0 && 
                <div data-test="none">
                   {msgLabels.noneText} 
                </div>
            }
            {messages.length > 0 && 
                <div data-test="table">
                    <table>
                        <thead className="table__head">
                            <tr className="table__headcells">
                                <td>{msgLabels.dateLabel}</td>
                                <td>{msgLabels.subjectLabel}</td>
                                <td className="table__statuscell">{msgLabels.statusLabel}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messages.map(message => {
                                    const messageStatus = this.processStatus(message.status)
                                    return (
                                        <tr data-test="message_item" key={message.trackId}>
                                            <td className="table__datecell">{message.date.toLocaleString('ru-RU',  {day: 'numeric', month: 'long'}) }</td>
                                            <td className="table__subjectcell">{message.subject}</td>
                                            <td className="table__statuscell">{messageStatus}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages
})

export default connect(mapStateToProps, { getStatus })(SentMessages)
