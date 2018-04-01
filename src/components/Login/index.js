import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { signUpAuth } from '../../Auth';

import './Login.css';

class Login extends React.Component {
  login = () => {
    signUpAuth.login();
    this.props.history.replace('/');
  }

  logout = () => {
    signUpAuth.logout(this.props.history);
  }

  render = () => {
    const isAuthenticated = signUpAuth.isAuthenticate();

    if (isAuthenticated) this.props.history.replace('/');
    return (
      <div className="Login">
        <div className="Login-modal">
          <div
            className="Login-modal-title"
          >A new way to apply for loans.
          </div>
          <div className="Login-modal-container">
            <div className="walkthrough-steps-image" />
            <ol className="Login-steps" >
              <li className="Login-steps-item">
                Connect your social media accounts.
              </li>
              <li className="Login-steps-item">
                Get your social score.
              </li>
              <li className="Login-steps-item">
                Apply for your loan.
              </li>
            </ol>
          </div>
          <div className="Login-secured-conditions">
            <ul>
              <li> We never repackage personal data for sale.</li>
              <li> We never store your logins.</li>
              <li> We never sell or share the content of your connections.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
