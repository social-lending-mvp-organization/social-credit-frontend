import React from 'react';
import PropTypes from 'prop-types';

import './css/Login.css';

function Login(props) {
  //const styleProp = {
  //  width: props.isLoggedIn ? '0vw' : '25vw',
  //};
  return (
    <div className="login-wrapper">
      <div className="login-wrapper-fb">
        FB BUTTON
      </div>
    </div>
  );
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
