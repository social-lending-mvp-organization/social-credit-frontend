import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';

import './css/Login.css';

function Login(props) {
  const logString = props.isLoggedIn ? 'Logged in' : 'Not logged in';
  return (
    <div>
      <Panel className="login-wrapper">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Login/Add account</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="login-wrapper-fb">
            <Button onClick={props.fbLoginClickHandler}>
              Facebook Login
            </Button>
            {`   ${logString}`}
          </div>
        </Panel.Body>
      </Panel>
    </div>
  );
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  fbLoginClickHandler: PropTypes.func.isRequired,
};

export default Login;
