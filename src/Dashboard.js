import React from 'react';
import PropTypes from 'prop-types';

import './css/Dashboard.css';

function Dashboard(props) {
  const isLoggedInText = props.isLoggedIn ? 'Logged in' : 'Not logged in';
  return (
    <div className="dashboard-wrapper">
      DASHBOARD CONTENT {isLoggedInText}
    </div>
  );
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Dashboard;
