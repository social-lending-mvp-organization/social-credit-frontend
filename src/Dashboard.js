import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './css/Dashboard.css';
import LoanHistory from './LoanHistory';

function Dashboard(props) {
  const isLoggedInText = props.isLoggedIn ? 'Logged in' : 'Not logged in';
  const userid = 'user1';
  const userid = '1';
  return (
    <Panel className="dashboard-wrapper">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Dashboard {isLoggedInText}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <LoanHistory userid={userid} isLoggedIn={props.isLoggedIn} />
      </Panel.Body>
    </Panel>
  );
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Dashboard;
