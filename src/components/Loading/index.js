import React from 'react';
import { withRouter } from 'react-router';
import { Modal } from 'react-bootstrap';

import './Loading.css';

class Loading extends React.Component {
  componentDidMount = async () => {
    await this.props.callback();
  }

  render = () => (
    <div className="Loading">
      <Modal.Dialog style={{ marginTop: '40vh' }}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default withRouter(Loading);
