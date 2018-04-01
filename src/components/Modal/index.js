import React from 'react';
import { Modal } from 'react-bootstrap';

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render = () => (
    <div>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {this.props.children}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.handleClose}>{this.props.label}</button>
          <button onClick={this.handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Modal;
