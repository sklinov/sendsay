import React, { Component } from 'react'
import { dragdrop } from '../../languages/ru'
import './styles.css'

export default class DragDropFiles extends Component {
    state = {
        drag: false
      }

    dropRef = React.createRef();

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true});
        }
    }
    
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--
        if (this.dragCounter === 0) {
          this.setState({drag: false});
        }
    }

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    }
    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop);
    }
      render() {
        return (
          <div className="dragdrop__block" ref={this.dropRef}>
            {this.state.drag &&
              <div className="dragdrop__border">
                <div className="dragdrop__fill">
                  <h1 className="dragdrop__heading">{dragdrop.heading}</h1>
                  <p className="dragdrop__text">{dragdrop.text}</p>
                </div>
              </div>
            }
            {this.props.children}
          </div>
        )
      }
}
