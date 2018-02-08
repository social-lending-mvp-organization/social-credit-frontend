import React from 'react';
import PropTypes from 'prop-types';

import './css/Login.css';

function Login(props) {
  const isLoggedInText = props.isLoggedIn ? 'Logged in' : 'Not logged in';
  return (
    <div className="login-wrapper">
      <div className="login-wrapper-fb">
        FB BUTTON {isLoggedInText}
      </div>
    </div>
  );
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
