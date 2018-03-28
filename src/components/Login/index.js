import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { signUpAuth } from '../../Auth';

import './Login.css';
import * as styles from './Login.style';


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
        <Navbar
          fluid
          className="bg-primary navbar-dark"
        >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Social Credit</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <Navbar.Link
              bsStyle="primary"
              className="btn-margin"
              onClick={() => this.login()}
              style={{ cursor: 'pointer' }}
            >
              Log In
            </Navbar.Link>
          </Nav>
        </Navbar>

        <div className="Login-modal">
          <p
            className="Login-modal-title"
            style={styles.modalTitle}
          >A new way to apply for loans.
          </p>
          <div className="Login-modal-container">
            <div className="walkthrough-steps-image" />
            <div className="Login-steps" >
              <p style={styles.step}>
                Connect your social media accounts.
              </p>
              <p style={styles.step}>
                Get your social score.
              </p >
              <p style={styles.step}>
                Apply for your loan.
              </p>
            </div>
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
