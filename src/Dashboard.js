import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './css/Dashboard.css';

function Dashboard(props) {
  const isLoggedInText = props.isLoggedIn ? 'Logged in' : 'Not logged in';
  return (
    <Panel className="dashboard-wrapper">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Dashboard {isLoggedInText}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>DASHBOARD CONTENT</Panel.Body>
    </Panel>
  );
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Dashboard;
