import React from 'react';
import { withRouter } from 'react-router';
import { Modal } from 'react-bootstrap';

class Loading extends React.Component {
  componentDidMount = async () => {
    await this.props.callback();
  }

  render = () => (
    <div>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Hold on</Modal.Title>
        </Modal.Header>
        <Modal.Body>loading...</Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default withRouter(Loading);
