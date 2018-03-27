import React from 'react';
import { Modal } from 'react-bootstrap';

const Callback = () => (
  <div>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Hold on</Modal.Title>
      </Modal.Header>
      <Modal.Body>loading...</Modal.Body>
    </Modal.Dialog>
  </div>
);

export default Callback;
