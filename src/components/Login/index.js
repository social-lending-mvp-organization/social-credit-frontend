import React from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import './Login.css';
import * as styles from './Login.style';

class Login extends React.Component {
  login = () => {
    this.props.auth.login();
    this.props.history.replace('/');
  }

  logout = () => {
    this.props.auth.logout(this.props.history);
  }

  render = () => {
    const isAuthenticated = this.props.auth.isAuthenticate();

    if (isAuthenticated) this.props.history.replace('/');
    return (
      <div className="Login">
        <Navbar
          fluid
          style={styles.navBar}
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
            >
                  Log In
            </Navbar.Link>
          </Nav>
        </Navbar>

        <div className="Login-modal">
          <p className="Login-modal-title">A new way to apply for loans</p>
          <div className="Login-modal-container">
            <div className="walkthrough-steps-image" />
            <div className="Login-steps">
              <p>
                Connect your social media accounts.
              </p>
              <p>
                Get your scoial score.
              </p>
              <p>
                Apply for loan.
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
