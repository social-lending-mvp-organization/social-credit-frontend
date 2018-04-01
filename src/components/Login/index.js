import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';

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
      <Grid fluid>
        <Row className="Login">
          <Col className="Login-modal" lgOffset={6} lg={6}>
            <div
              className="Login-app"
            >Social Credit
            </div>
            <div
              className="Login-modal-title"
            >A new way to apply for loans.
            </div>
            <div className="Login-modal-container">
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
            <button
              className="Login-login-button"
              onClick={() => this.login()}

            >{"Let's get started"}
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Login);
